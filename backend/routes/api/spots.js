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
const { requireAuth, spotExists, spotOwner } = require("../../utils/auth");
const express = require("express");
const { RiContactsBookLine } = require("react-icons/ri");
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
  const { user } = req;

  const spotData = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
    include: [{ model: Review }, { model: SpotImage }],
  });

  const formattedSpots = formatSpotsArray(spotData);

  return res.json({ Spots: formattedSpots });
});

// ------------------------------ //
// ------ GET A SPOT BY ID ------ //
// ------------------------------ //

router.get("/:spotId", spotExists, async (req, res) => {
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

  const formattedSpot = formatOneSpot(spotData);

  return res.json(formattedSpot);
});

// --------------------------- //
// ------ CREATE A SPOT ------ //
// --------------------------- //

router.post("/", requireAuth, validateSpot, async (req, res) => {
  const {
    user,
    body: { address, city, state, country, lat, lng, name, description, price },
  } = req;

  const newSpot = await Spot.create({
    ownerId: user.id,
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

router.post(
  "/:spotId/images",
  requireAuth,
  spotExists,
  spotOwner,
  async (req, res) => {
    const {
      spotImages,
      params: { spotId },
      body,
    } = req;

    const newImages = [...body];
    let numImages = 0;

    for (const newImage of newImages.slice(1, 5)) {
      if (newImage.url) numImages++;
    }

    if (spotImages.length) {
      for (let i = 0; i < spotImages.length; i++) {
        existingImage = spotImages[i].dataValues;
        if (existingImage.preview) {
          await SpotImage.destroy({ where: { id: existingImage.id } });
        } else if (numImages > 0) {
          await SpotImage.destroy({ where: { id: existingImage.id } });
          numImages--;
        }
      }
    }
    await SpotImage.create({ spotId, url: newImages[0].url, preview: true });

    for (const newImage of newImages.slice(1, 5)) {
      if (newImage.url) {
        await SpotImage.create({ spotId, url: newImage.url, preview: false });
      }
    }

    const createdImages = await SpotImage.findAll({ where: { spotId } });

    return res.json(createdImages)
  }
);

// ------------------------- //
// ------ EDIT A SPOT ------ //
// ------------------------- //

router.put(
  "/:spotId",
  requireAuth,
  validateSpot,
  spotExists,
  spotOwner,
  async (req, res) => {
    const {
      body: {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      },
      spotData,
    } = req;

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

router.delete(
  "/:spotId",
  requireAuth,
  spotExists,
  spotOwner,
  async (req, res) => {
    const { spotData } = req;

    await spotData.destroy();

    return res.json({ message: "Successfully deleted" });
  }
);

// ------------------------------------ //
// ------ GET REVIEWS BY SPOT ID ------ //
//------------------------------------- //

router.get("/:spotId/reviews", spotExists, async (req, res) => {
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
  spotExists,
  async (req, res) => {
    let {
      user,
      params: { spotId },
      body: { review, stars },
    } = req;
    spotId = Number(spotId);

    const existingReview = await Review.findOne({
      where: {
        spotId,
        userId: user.id,
      },
    });

    if (existingReview) {
      return res
        .status(500)
        .json({ message: "User already has a review for this spot" });
    } else {
      const newReview = await Review.create({
        userId: user.id,
        spotId,
        review,
        stars,
      });

      return res.status(201).json(newReview);
    }
  }
);

// ---------------------------------------------- //
// ------ GET BOOKINGS FOR SPOT BY SPOT ID ------ //
// ---------------------------------------------- //

router.get("/:spotId/bookings", requireAuth, spotExists, async (req, res) => {
  const {
    user,
    spotData,
    params: { spotId },
  } = req;

  if (spotData.ownerId !== user.id) {
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
});

// ------------------------------------------------ //
// ------ CREATE BOOKING FOR SPOT BY SPOT ID ------ //
// ------------------------------------------------ //

router.post(
  "/:spotId/bookings",
  requireAuth,
  spotExists,
  validateBooking,
  validateDates,
  async (req, res) => {
    let {
      user,
      spotData,
      params: { spotId },
      body: { startDate, endDate },
    } = req;
    spotId = Number(spotId);

    if (user.id === spotData.ownerId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const newBooking = await Booking.create({
      userId: user.id,
      spotId,
      startDate,
      endDate,
    });

    return res.json(newBooking);
  }
);

module.exports = router;
