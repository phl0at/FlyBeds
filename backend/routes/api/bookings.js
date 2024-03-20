const { Spot, SpotImage, Booking } = require("../../db/models");
const { requireAuth, confirmBooking } = require("../../utils/auth");
const { validateBooking, validateDates } = require("../../utils/validation");
const currDate = new Date().toISOString().split("T")[0];
const express = require("express");
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

      // come back to this later. because of the way im querying with includes,
      // i may not need to have this conditional. would have to rename image
      // urls in seed data to test since they are all exactly the same
      // across all spot images
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

router.put(
  "/:bookingId",
  requireAuth,
  validateBooking,
  confirmBooking,
  async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const editBook = res.locals.bookData;

    // booking has already past
    if (editBook.endDate < currDate) {
      const err = new Error("Past bookings can't be modified");
      err.hideTitle = true;
      err.status = 403;
      return next(err);
    }

    const bookData = await Booking.findAll({
      where: {
        spotId: editBook.spotId,
      },
    });
    validateDates(bookData, bookingId, endDate, startDate, res);

    await editBook.update({
      startDate,
      endDate,
    });
    return res.json(editBook);
  }
);

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
  if (!bookData) {
    const err = new Error("Booking couldn't be found");
    err.hideTitle = true;
    err.status = 404;
    return next(err);
  }

  if (
    bookData.userId === currUser.id ||
    bookData.Spot.ownerId === currUser.id
  ) {
    if (bookData.startDate < currDate) {
      const err = new Error("Bookings that have been started can't be deleted");
      err.hideTitle = true;
      err.status = 403;
      return next(err);
    } else {
      await bookData.destroy();
      return res.json({ message: "Successfully deleted" });
    }
  } else {
    const err = new Error("Forbidden");
    err.hideTitle = true;
    err.status = 403;
    return next(err);
  }
});

module.exports = router;
