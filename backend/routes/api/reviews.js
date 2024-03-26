const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
} = require("../../db/models");
const {
  requireAuth,
  reviewExists,
  reviewOwner,
  reviewImageNum,
} = require("../../utils/auth");
const { validateReview } = require("../../utils/validation");
const express = require("express");
const router = express.Router();

// ----------------------------------------- //
// ------ GET REVIEWS OF CURRENT USER ------ //
// ----------------------------------------- //

router.get("/current", requireAuth, async (req, res) => {
  const reviewData = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: {
          exclude: ["createdAt", "updatedAt", "description"],
        },
        include: [{ model: SpotImage, where: { preview: true } }],
      },
      {
        model: ReviewImage,
        attributes: {
          exclude: ["createdAt", "updatedAt", "reviewId"],
        },
      },
    ],
  });

  for (const review of reviewData) {
    const currSpot = review.Spot.dataValues;
    const currImage = currSpot.SpotImages[0];
    currSpot.previewImage = currImage.url;
    delete currSpot.SpotImages;
  }

  return res.json({ Reviews: reviewData });
});

// ---------------------------------------------- //
// ------ ADD IMAGE TO REVIEW BY REVIEW ID ------ //
// ---------------------------------------------- //

router.post(
  "/:reviewId/images",
  requireAuth,
  reviewExists,
  reviewOwner,
  reviewImageNum,
  async (req, res) => {
    const {
      params: { reviewId },
      body: { url },
    } = req;

    const newImage = await ReviewImage.create({ reviewId, url });

    return res.json({ id: newImage.id, url });
  }
);

// --------------------------- //
// ------ EDIT A REVIEW ------ //
// --------------------------- //

router.put(
  "/:reviewId",
  requireAuth,
  validateReview,
  reviewExists,
  reviewOwner,
  async (req, res) => {
    const {
      body: { review, stars },
      reviewData,
    } = req;

    delete reviewData.dataValues.ReviewImages;

    await reviewData.update({ review, stars });

    return res.json(reviewData);
  }
);

// ----------------------------- //
// ------ DELETE A REVIEW ------ //
// ----------------------------- //

router.delete(
  "/:reviewId",
  requireAuth,
  reviewExists,
  reviewOwner,
  async (req, res) => {
    const { reviewData } = req;

    await reviewData.destroy();

    return res.json({ message: "Successfully deleted" });
  }
);

module.exports = router;
