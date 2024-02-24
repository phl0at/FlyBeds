const express = require("express");
const bcrypt = require("bcryptjs");
const sequelize = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { Spot } = require("../../db/models");
const { SpotImage } = require("../../db/models");
const { Review } = require("../../db/models");
const { ReviewImage } = require("../../db/models");

const router = express.Router();

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90"),
  check("lng")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),
  check("name")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors,
];

// ----- GET ALL SPOTS ------ //

router.get("/", async (req, res) => {
  const spotData = await Spot.findAll();
  const reviewData = await Review.findAll();
  const spotImages = await SpotImage.findAll();
  let sum = [];
  for (let i = 0; i < spotData.length; i++) {
    let currSpot = spotData[i].dataValues;

    for (let j = 0; j < reviewData.length; j++) {
      let currReview = reviewData[j].dataValues;

      if (currSpot.id === currReview.spotId) sum.push(currReview.stars);
      if (reviewData[j + 1] === undefined) {
        currSpot.avgRating =
          sum.reduce((acc, curr) => acc + curr, 0) / sum.length;
        sum = [];
      }
    }

    for (let k = 0; k < spotImages.length; k++) {
      let currImage = spotImages[k].dataValues;
      if (currSpot.id === currImage.spotId && currImage.preview === true) {
        currSpot.previewImage = currImage.url;
      }
    }
  }

  return res.json({ Spots: spotData });
});

// ----- GET ALL SPOTS OF CURRENT USER ------ //

router.get("/current", requireAuth, async (req, res) => {
  const currentUserId = req.user.dataValues.id;
  const spotImages = await SpotImage.findAll();
  const reviewData = await Review.findAll();
  const spotData = await Spot.findAll({
    where: {
      ownerId: currentUserId,
    },
  });
  let sum = [];
  for (let i = 0; i < spotData.length; i++) {
    let currSpot = spotData[i].dataValues;

    for (let j = 0; j < reviewData.length; j++) {
      let currReview = reviewData[j].dataValues;

      if (currSpot.id === currReview.spotId) sum.push(currReview.stars);
      if (reviewData[j + 1] === undefined) {
        currSpot.avgRating =
          sum.reduce((acc, curr) => acc + curr, 0) / sum.length;
        sum = [];
      }
    }
    for (let k = 0; k < spotImages.length; k++) {
      let currImage = spotImages[k].dataValues;
      if (currSpot.id === currImage.spotId && currImage.preview === true) {
        currSpot.previewImage = currImage.url;
      }
    }
  }

  return res.json({ Spots: spotData });
});

// ----- GET ALL SPOTS BY ID ------ //

router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  const reviewData = await Review.findAll();
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
    ],
  });
  if (!spotData) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  spotData.dataValues.numReviews = 0;
  let sum = [];
  for (let j = 0; j < reviewData.length; j++) {
    let currReview = reviewData[j].dataValues;

    if (spotData.dataValues.id === currReview.spotId) {
      spotData.dataValues.numReviews++;
      sum.push(currReview.stars);
    }
    if (reviewData[j + 1] === undefined) {
      spotData.dataValues.avgRating =
        sum.reduce((acc, curr) => acc + curr, 0) / sum.length;
      sum = [];
    }
  }

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
    spotData.address = address;
    spotData.city = city;
    spotData.state = state;
    spotData.country = country;
    spotData.lat = lat;
    spotData.lng = lng;
    spotData.name = name;
    spotData.description = description;
    spotData.price = price;
    await spotData.save();
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

module.exports = router;
