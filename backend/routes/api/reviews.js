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

  if (reviewData.userId !== currUser.id)
    return res.status(403).json({ message: "forbidden " });

  const allImages = await ReviewImage.findAll({
    where: {
      reviewId,
    },
  });

  if (allImages.length >= 10)
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });

  const newImage = await ReviewImage.create({
    reviewId,
    url,
  });

  return res.json({
    id: newImage.id,
    url,
  });
});

// ------ EDIT A REVIEW ------ //

router.put("/:reviewId", requireAuth, validateReview, async (req, res) => {
  const { reviewId } = req.params;
  const currUser = req.user.dataValues;
  const { review, stars } = req.body;
  const reviewData = await Review.findByPk(reviewId);
  if (!reviewData)
    return res.status(404).json({ message: "Review couldn't be found" });
  if (currUser.id !== reviewData.userId)
    return res.status(403).json({ message: "Forbidden" });

  reviewData.review = review;
  reviewData.stars = stars;
  await reviewData.save();

  return res.json(reviewData);
});

// ------ DELETE A REVIEW ------ //

router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const currUser = req.user.dataValues;
  const reviewData = await Review.findByPk(reviewId);
  if (!reviewData)
    return res.status(404).json({ message: "Review couldn't be found" });
  if (currUser.id !== reviewData.userId)
    return res.status(403).json({ message: "Forbidden" });

  await reviewData.destroy();

  return res.json({ message: "Successfully deleted" });
});

module.exports = router;
