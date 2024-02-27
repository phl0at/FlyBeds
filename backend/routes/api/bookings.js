const express = require("express");
const { validateBooking } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");
const { SpotImage } = require("../../db/models");
const { Booking } = require("../../db/models");
const currDate = new Date().toISOString().split("T")[0];

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
  const currUser = req.user.dataValues;
  const bookData = await Booking.findAll({
    where: {
      userId: currUser.id,
    },
  });
  const spotData = await Spot.findAll();
  const spotImages = await SpotImage.findAll();

  for (let i = 0; i < spotData.length; i++) {
    let currSpot = spotData[i].dataValues;

    for (let k = 0; k < spotImages.length; k++) {
      let currImage = spotImages[k].dataValues;
      if (currSpot.id === currImage.spotId && currImage.preview === true) {
        currSpot.previewImage = currImage.url;
        delete currSpot.description;
        delete currSpot.createdAt;
        delete currSpot.updatedAt;
      }
    }
    for (let j = 0; j < bookData.length; j++) {
      let currBook = bookData[j].dataValues;

      if (currSpot.id === currBook.spotId) {
        currBook.Spot = currSpot;
      }
    }
  }

  return res.json({ Bookings: bookData });
});

router.put("/:bookingId", requireAuth, validateBooking, async (req, res) => {
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;
  const currUser = req.user.dataValues;
  const editBook = await Booking.findByPk(bookingId);

  if (!editBook)
    // booking doesn't exist
    return res.status(404).json({ message: "Booking couldn't be found" });

  if (editBook.userId !== currUser.id)
    // current user doesn't own booking
    return res.status(403).json({ message: "Forbidden" });

  if (editBook.endDate < currDate)
    // booking has already past
    return res.status(403).json({ message: "Past bookings can't be modified" });

  const bookData = await Booking.findAll({
    where: {
      spotId: editBook.spotId,
    },
  });

  // iterate bookings of the same spot and check for conflicts with dates provided in req.body
  for (let i = 0; i < bookData.length; i++) {
    let booking = bookData[i].dataValues;
    let currStart = booking.startDate.toISOString().split("T")[0];
    let currEnd = booking.endDate.toISOString().split("T")[0];
    let errors = {};
    console.log('CURRENT ID', booking.id,'PARAM ID', bookingId)
    //don't want to throw errors for the booking we want to edit!
    if (booking.id !== Number(bookingId)) {
      // start date falls within an existing booking
      if (startDate >= currStart && startDate <= currEnd)
        errors.startDate = "Start date conflicts with an existing booking";
      if (endDate >= currStart && endDate <= currEnd)
        // end date falls within an existing booking
        errors.endDate = "End date conflicts with an existing booking";
      // start/end within an existing booking
      if (startDate >= currStart && endDate <= currEnd) {
        errors.endDate = "End date conflicts with an existing booking";
        errors.startDate = "Start date conflicts with an existing booking";
      }
      // start/end wrapped around an existing booking
      if (startDate <= currStart && endDate >= currEnd) {
        errors.endDate = "End date conflicts with an existing booking";
        errors.startDate = "Start date conflicts with an existing booking";
      }
      if (errors.startDate || errors.endDate)
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors,
        });
    }
  }

  // update and return new booking dates
  editBook.startDate = startDate;
  editBook.endDate = endDate;
  await editBook.save();
  return res.json(editBook);
});

router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const currUser = req.user.dataValues;
  const bookData = await Booking.findOne({
    where: {
      id: bookingId,
    },
    include: {
      model: Spot,
    },
  });
  if (!bookData)
    return res.status(404).json({ message: "Booking couldn't be found" });

  if (
    bookData.userId === currUser.id ||
    bookData.Spot.ownerId === currUser.id
  ) {
    console.log(currDate);
    if (bookData.startDate < currDate) {
      return res
        .status(403)
        .json({ message: "Bookings that have been started can't be deleted" });
    }

    await bookData.destroy();

    return res.json({ message: "Successfully deleted" });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

module.exports = router;
