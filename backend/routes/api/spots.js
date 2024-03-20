const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");
const {
  validateSpot,
  validateReview,
  validateBooking,
  validateQuery,
  validateDates,
} = require("../../utils/validation");
const {
  setQueries,
  formatOneSpot,
  formatSpotsArray,
} = require("../../utils/helper");
const { requireAuth, confirmSpot, notOwner } = require("../../utils/auth");
const express = require("express");
const router = express.Router();

// --------------------------- //
// ------ GET ALL SPOTS ------ //
// --------------------------- //

router.get("/", validateQuery, async (req, res) => {
  let {
    page = 1,
    size = 20,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
  } = req.query;
  page = Number(page);
  size = Number(size);
  if (page === 0) page = 1;
  if (size === 0) size = 20;

  const where = setQueries(minLat, maxLat, minLng, maxLng, minPrice, maxPrice);

  const spotData = await Spot.findAll({
    where,
    limit: size,
    offset: size * (page - 1),
    include: [{ model: Review }, { model: SpotImage }],
  });

  const formattedSpots = formatSpotsArray(spotData);

  return res.json({ Spots: formattedSpots, page, size });
});

// ------------------------------------------- //
// ------ GET ALL SPOTS OF CURRENT USER ------ //
// ------------------------------------------- //

router.get("/current", requireAuth, async (req, res) => {
  const currentUserId = req.user.dataValues.id;
  const spotData = await Spot.findAll({
    where: {
      ownerId: currentUserId,
    },
    include: [{ model: Review }, { model: SpotImage }],
  });

  const formattedSpots = formatSpotsArray(spotData);

  return res.json({ Spots: formattedSpots });
});

// --------------------------------- //
// ------ GET ALL SPOTS BY ID ------ //
// --------------------------------- //

router.get("/:spotId", notOwner, confirmSpot, async (req, res) => {
  const { spotId } = req.params;
  const spotData = await Spot.findOne({
    where: {
      id: spotId,
    },
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
      { model: Review },
    ],
  });

  const reviewData = spotData.dataValues.Reviews;

  const formattedSpot = formatOneSpot(spotData, reviewData);

  return res.json(formattedSpot);
});

// --------------------------- //
// ------ CREATE A SPOT ------ //
// --------------------------- //

router.post("/", requireAuth, validateSpot, async (req, res) => {
  const currUserId = req.user.dataValues.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const newSpot = await Spot.create({
    ownerId: currUserId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  return res.status(201).json(newSpot);
});

// ------------------------------- //
// ------ ADD IMAGE TO SPOT ------ //
// ------------------------------- //

router.post("/:spotId/images", requireAuth, confirmSpot, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const newSpotImage = await SpotImage.create({
    spotId,
    url,
    preview,
  });

  return res.json({
    id: newSpotImage.id,
    url,
    preview,
  });
});

// ------------------------- //
// ------ EDIT A SPOT ------ //
// ------------------------- //

router.put(
  "/:spotId",
  requireAuth,
  validateSpot,
  confirmSpot,
  async (req, res) => {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    const spotData = req.spotData;

    await spotData.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    return res.json(spotData);
  }
);

// --------------------------- //
// ------ DELETE A SPOT ------ //
// --------------------------- //

router.delete("/:spotId", requireAuth, confirmSpot, async (req, res) => {
  const spotData = req.spotData;
  await spotData.destroy();
  return res.json({ message: "Successfully deleted" });
});

// ------------------------------------ //
// ------ GET REVIEWS BY SPOT ID ------ //
// ------------------------------------ //

router.get("/:spotId/reviews", notOwner, confirmSpot, async (req, res) => {
  const { spotId } = req.params;
  const reviewData = await Review.findAll({
    where: {
      spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  return res.json({ Reviews: reviewData });
});

// -------------------------------------------- //
// ------ CREATE REVIEW BASED ON SPOT ID ------ //
// -------------------------------------------- //

router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  notOwner,
  confirmSpot,
  async (req, res) => {
    let { spotId } = req.params;
    spotId = Number(spotId);
    const { review, stars } = req.body;
    const currUser = req.user.dataValues;

    const existingReview = await Review.findOne({
      where: {
        spotId,
        userId: currUser.id,
      },
    });

    if (existingReview) {
      return res
        .status(500)
        .json({ message: "User already has a review for this spot" });
    }

    const newReview = await Review.create({
      userId: currUser.id,
      spotId,
      review,
      stars,
    });

    return res.status(201).json(newReview);
  }
);

// ---------------------------------------------- //
// ------ GET BOOKINGS FOR SPOT BY SPOT ID ------ //
// ---------------------------------------------- //

router.get(
  "/:spotId/bookings",
  requireAuth,
  notOwner,
  confirmSpot,
  async (req, res) => {
    const currUser = req.user.dataValues;
    const { spotId } = req.params;
    const spotData = req.spotData;

    if (spotData.ownerId !== currUser.id) {
      const bookData = await Booking.findAll({
        where: {
          spotId,
        },
        attributes: ["spotId", "startDate", "endDate"],
      });
      return res.json({ Bookings: bookData });
    } else {
      const bookData = await Booking.findAll({
        where: {
          spotId,
        },
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      });
      return res.json({ Bookings: bookData });
    }
  }
);

// ------------------------------------------------ //
// ------ CREATE BOOKING FOR SPOT BY SPOT ID ------ //
// ------------------------------------------------ //

router.post(
  "/:spotId/bookings",
  requireAuth,
  notOwner,
  confirmSpot,
  validateBooking,
  validateDates,
  async (req, res) => {
    let { spotId } = req.params;
    spotId = Number(spotId);
    const { startDate, endDate } = req.body;
    const currUser = req.user.dataValues;
    const spotData = await Spot.findOne({
      where: { id: spotId },
      include: [{ model: Booking }],
    });

    //spot cannot belong to user!
    if (currUser.id === spotData.ownerId)
      return res.status(403).json({ message: "Forbidden" });

    const newBooking = await Booking.create({
      userId: currUser.id,
      spotId,
      startDate,
      endDate,
    });

    return res.json(newBooking);
  }
);

module.exports = router;
