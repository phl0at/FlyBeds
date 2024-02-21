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

const router = express.Router();

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

  //NEED TO SEED SPOT IMAGES AND ADD A 'previewImage' ATTRIBUTE TO RESPONSE
  return res.json(spotData);
});

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

  return res.json(spotData);
});

router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  const spotImages = await SpotImage.findAll();
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

module.exports = router;
