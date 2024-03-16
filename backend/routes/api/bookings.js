const express = require("express");
const { validateBooking } = require("../../utils/validation");
const { requireAuth, confirmBookingOwnership } = require("../../utils/auth");
const { confirmBookingExists } = require("../../utils/helper");
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
});

// ---------------------------- //
// ------ EDIT A BOOKING ------ //
// ---------------------------- //

router.put("/:bookingId", requireAuth, validateBooking, async (req, res) => {
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;
  const currUser = req.user.dataValues;
  const editBook = await Booking.findByPk(bookingId);

  confirmBookingExists(editBook);
  confirmBookingOwnership(currUser, editBook);

  // booking has already past
  if (editBook.endDate < currDate)
    return res.status(403).json({ message: "Past bookings can't be modified" });

  const bookData = await Booking.findAll({
    where: {
      spotId: editBook.spotId,
    },
  });
  validateDates(bookData, bookingId, endDate, startDate, res);

  await editBook.update({
    startDate,
    endDate
  })
  return res.json(editBook);
});

// ------------------------------ //
// ------ DELETE A BOOKING ------ //
// ------------------------------ //

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
  confirmBookingExists(bookData);

  if (
    bookData.userId === currUser.id ||
    bookData.Spot.ownerId === currUser.id
  ) {
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
