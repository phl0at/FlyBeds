const express = require("express");
const { validateBooking } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Booking } = require("../../db/models");
const currDate = new Date().toISOString().split("T")[0];
const router = express.Router();

// ------------------------------------ //
// ------ GET CURR USER BOOKINGS ------ //
// ------------------------------------ //

router.get("/current", requireAuth, async (req, res) => {
  const currUser = req.user.dataValues;
  const spotData = await Spot.findAll({
    include: [
      { model: SpotImage, where: { preview: true } },
      { model: Booking, where: { userId: currUser.id } },
    ],
  });
  const bookData = [];

  for (const spot of spotData) {
    const bookings = spot.dataValues.Bookings;

    for (const image of spot.dataValues.SpotImages) {
      const imageData = image.dataValues;

      if (imageData.spotId === spot.id)
        spot.dataValues.previewImage = imageData.url;
    }

    for (const booking of bookings) {
      booking.dataValues.Spot = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        price: spot.price,
        previewImage: spot.dataValues.previewImage,
      };
      bookData.push({
        id: booking.id,
        spotId: booking.spotId,
        Spot: booking.dataValues.Spot,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      });
    }
  }

  return res.json({ Bookings: bookData });
  //old code
  // for (const spot of spotData) {
  //   const bookings = spot.dataValues.Bookings;

  // for (let i = 0; i < spotData.length; i++) {
  //   let currSpot = spotData[i].dataValues;
  //   currSpot.previewImage = null;

  //   for (let k = 0; k < spotImages.length; k++) {
  //     let currImage = spotImages[k].dataValues;
  //     if (currSpot.id === currImage.spotId && currImage.preview === true) {
  //       currSpot.previewImage = currImage.url;
  //       delete currSpot.description;
  //       delete currSpot.createdAt;
  //       delete currSpot.updatedAt;
  //     }
  //   }
});

// ---------------------------- //
// ------ EDIT A BOOKING ------ //
// ---------------------------- //

router.put("/:bookingId", requireAuth, validateBooking, async (req, res) => {
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;
  const currUser = req.user.dataValues;
  const editBook = await Booking.findByPk(bookingId);

  // booking doesn't exist
  if (!editBook)
    return res.status(404).json({ message: "Booking couldn't be found" });

  // current user doesn't own booking
  if (editBook.userId !== currUser.id)
    return res.status(403).json({ message: "Forbidden" });

  // booking has already past
  if (editBook.endDate < currDate)
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
    //don't want to throw errors for the booking we want to edit!
    if (booking.id !== Number(bookingId)) {
      // start date falls within an existing booking
      if (startDate >= currStart && startDate <= currEnd) {
        errors.startDate = "Start date conflicts with an existing booking";
      }
      // end date falls within an existing booking
      if (endDate >= currStart && endDate <= currEnd) {
        errors.endDate = "End date conflicts with an existing booking";
      }
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
