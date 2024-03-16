const {
  validateSpot,
  validateReview,
  validateBooking,
  validateQuery,
  setQueries,
} = require("../../utils/validation");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");
const express = require("express");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

// ----- GET ALL SPOTS ------ //

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

  let where = setQueries(minLat, maxLat, minLng, maxLng, minPrice, maxPrice);

  const spotData = await Spot.findAll({
    where,
    limit: size,
    offset: size * (page - 1),
    include: [{ model: Review }, { model: SpotImage }],
  });
  //iterate all spots and set the default previewImage value
  for (const spot of spotData) {
    let starSum = 0;
    let starNum = 0;
    const currSpot = spot.dataValues;
    currSpot.previewImage = null;
    currSpot.avgRating = null;
    //iterate all reviews and add the avgRating to each one's spot
    for (const review of currSpot.Reviews) {
      const currReview = review.dataValues;

      if (currSpot.id === currReview.spotId) {
        starSum += currReview.stars;
        starNum++;
      }
      const avg = starSum / starNum;
      currSpot.avgRating = Number(avg.toFixed(1));
    }
    //iterate all spot images and add a previewImage to each one's spot
    for (const image of currSpot.SpotImages) {
      const currImage = image.dataValues;

      if (currSpot.id === currImage.spotId && currImage.preview === true) {
        currSpot.previewImage = currImage.url;
      }
    }
    delete currSpot.Reviews;
    delete currSpot.SpotImages;
  }
  return res.json({ Spots: spotData, page, size });
});

// ----- GET ALL SPOTS OF CURRENT USER ------ //

router.get("/current", requireAuth, async (req, res) => {
  const currentUserId = req.user.dataValues.id;
  const spotData = await Spot.findAll({
    where: {
      ownerId: currentUserId,
    },
    include: [{ model: Review }, { model: SpotImage }],
  });

  //iterate all spots and set the default previewImage value
  for (const spot of spotData) {
    let starSum = 0;
    let starNum = 0;
    const currSpot = spot.dataValues;
    currSpot.previewImage = null;
    currSpot.avgRating = null;
    //iterate all reviews and add the avgRating to each one's spot
    for (const review of currSpot.Reviews) {
      const currReview = review.dataValues;

      if (currSpot.id === currReview.spotId) {
        starSum += currReview.stars;
        starNum++;
      }
      const avg = starSum / starNum;
      currSpot.avgRating = Number(avg.toFixed(1));
    }
    //iterate all spot images and add a previewImage to each one's spot
    for (const image of currSpot.SpotImages) {
      const currImage = image.dataValues;

      if (currSpot.id === currImage.spotId && currImage.preview === true) {
        currSpot.previewImage = currImage.url;
      }
    }
    delete currSpot.Reviews;
    delete currSpot.SpotImages;
  }
  return res.json({ Spots: spotData });
});

// ----- GET ALL SPOTS BY ID ------ //

router.get("/:spotId", async (req, res) => {
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
  if (!spotData) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  const reviewData = spotData.dataValues.Reviews;
  spotData.dataValues.numReviews = 0;
  let starSum = 0;

  for (const review of reviewData) {
    const currReview = review.dataValues;
    spotData.dataValues.numReviews++;
    starSum += currReview.stars;
    const avg = starSum / spotData.dataValues.numReviews;
    spotData.dataValues.avgRating = Number(avg.toFixed(1));
  }
  delete spotData.dataValues.Reviews;
  return res.json(spotData);
});

// ----- CREATE A SPOT ------ //

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

// ----- ADD IMAGE TO SPOT ------ //

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const currUser = req.user.dataValues;
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const spotData = await Spot.findByPk(spotId);
  if (!spotData)
    return res.status(404).json({ message: "Spot couldn't be found" });
  if (spotData.ownerId === currUser.id) {
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
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// ----- EDIT A SPOT ------ //

router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  const currUser = req.user.dataValues;
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spotData = await Spot.findByPk(spotId);

  if (!spotData)
    return res.status(404).json({ message: "Spot couldn't be found" });

  if (spotData.ownerId === currUser.id) {
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
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// ----- DELETE A SPOT ------ //

router.delete("/:spotId", requireAuth, async (req, res) => {
  const currUser = req.user.dataValues;
  const { spotId } = req.params;
  const spotData = await Spot.findByPk(spotId);
  if (!spotData)
    return res.status(404).json({ message: "Spot couldn't be found" });

  if (spotData.ownerId === currUser.id) {
    await spotData.destroy();
    return res.json({ message: "Successfully deleted" });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

// ------ GET REVIEWS BY SPOT ID ------ //

router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;
  const spotData = await Spot.findByPk(spotId);

  if (!spotData)
    return res.status(404).json({ message: "Spot couldn't be found" });

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

// ------ CREATE REVIEW BASED ON SPOT ID ------ //

router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res) => {
    let { spotId } = req.params;
    spotId = Number(spotId);
    const { review, stars } = req.body;
    const currUser = req.user.dataValues;
    const spotData = await Spot.findByPk(spotId);
    if (!spotData) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
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

// ------ GET BOOKINGS FOR SPOT BY SPOT ID ------ //

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const currUser = req.user.dataValues;
  const { spotId } = req.params;
  const spotData = await Spot.findByPk(spotId);

  if (!spotData)
    return res.status(404).json({ message: "Spot couldn't be found" });

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
});

// ------ CREATE BOOKING FOR SPOT BY SPOT ID ------ //

router.post(
  "/:spotId/bookings",
  requireAuth,
  validateBooking,
  async (req, res) => {
    let { spotId } = req.params;
    spotId = Number(spotId);
    const { startDate, endDate } = req.body;
    const currUser = req.user.dataValues;
    const spotData = await Spot.findOne({
      where: spotId,
      include: [{ model: Booking }],
    });

    if (!spotData)
      return res.status(404).json({ message: "Spot couldn't be found" });

    const bookData = spotData.dataValues.Bookings;
    
    if (currUser.id === spotData.ownerId)
      return res.status(403).json({ message: "Forbidden" });

    for (let i = 0; i < bookData.length; i++) {
      let booking = bookData[i].dataValues;
      let currStart = booking.startDate.toISOString().split("T")[0];
      let currEnd = booking.endDate.toISOString().split("T")[0];
      let errors = {};

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
