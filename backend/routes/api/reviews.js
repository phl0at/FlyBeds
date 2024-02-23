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

// ------ GET REVIEWS OF CURRENT USER ------ //

router.get("/current", requireAuth, async (req, res) => {
  const currUser = req.user.dataValues;
  const reviewData = await Review.findAll({
    where: {
      userId: currUser.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
      {
        model: ReviewImage,
        attributes: {
          exclude: ["createdAt", "updatedAt", "reviewId"],
        },
      },
    ],
  });

  return res.json({ Reviews: reviewData });
});

// ------ ADD IMAGE TO REVIEW BY REVIEW ID ------ //

router.post("/:reviewId/images", requireAuth, async (req, res) => {
  let { reviewId } = req.params;
  reviewId = Number(reviewId);
  const currUser = req.user.dataValues;
  const { url } = req.body;
  const reviewData = await Review.findByPk(reviewId);
  if (!reviewData)
    return res.status(404).json({ message: "Review couldn't be found" });

  const allImages = await ReviewImage.findAll({
    where: {
      reviewId,
    },
  });

  if (allImages.length >= 10)
    return res
      .status(403)
      .json({
        message: "Maximum number of images for this resource was reached",
      });

  const newImage = await ReviewImage.create({
    reviewId,
    url,
  });
  const imageData = await ReviewImage.findOne({
    where: {
      id: newImage.id
    },
    attributes: ["id", "url"],
  });
  return res.json(imageData);
});

module.exports = router;
