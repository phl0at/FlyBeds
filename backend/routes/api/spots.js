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

router.get("/", async (req, res) => {
  const spotData = await Spot.findAll();
  const reviewData = await Review.findAll();
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
    console.log(currSpot);
  }
  // console.log(avg);

  //FEB 20TH STILL NEED TO ADD "avgRating" AND "previewImage" ATTRIBUTES
  return res.json(spotData);
});

router.get("/current", requireAuth, async (req, res) => {
  const currentUserId = req.user.dataValues.id;
  const spotData = await Spot.findAll({
    where: {
      ownerId: currentUserId,
    },
  });

  return res.json(spotData);
});

router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  const spotData = await Spot.findAll({
    where: {
      id: spotId,
    },
    include: [
      {
        model: SpotImage,
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  if (!spotData.length) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  } else {
    return res.json(spotData);
  }
});

module.exports = router;
