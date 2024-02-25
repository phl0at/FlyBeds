const express = require("express");
const { validateReview } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { Spot } = require("../../db/models");
const { SpotImage } = require("../../db/models");
const { Review } = require("../../db/models");
const { ReviewImage } = require("../../db/models");
const router = express.Router();

// ------ GET REVIEWS OF CURRENT USER ------ //

router.get("/current", requireAuth, async (req, res) => {
  const currUser = req.user.dataValues;
  const spotData = await Spot.findAll();
  const spotImages = await SpotImage.findAll();
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
        model: ReviewImage,
        attributes: {
          exclude: ["createdAt", "updatedAt", "reviewId"],
        },
      },
    ],
  });

  // for (let n = 0; n < reviewData.length; n++) {
  //   let review = reviewData[n].dataValues;
  //   review.createdAt = `${review.createdAt.toISOString().split("T")[0]} ${
  //     review.createdAt.toISOString().split("T")[1].split(".")[0]
  //   }`;
  //   review.updatedAt = `${review.updatedAt.toISOString().split("T")[0]} ${
  //     review.updatedAt.toISOString().split("T")[1].split(".")[0]
  //   }`;
  // }

  // iterate all spots
  for (let i = 0; i < spotData.length; i++) {
    let currSpot = spotData[i].dataValues;

    // iterate all spot images and add a previewImage to the
    // corresponding spot
    for (let k = 0; k < spotImages.length; k++) {
      let currImage = spotImages[k].dataValues;
      if (currSpot.id === currImage.spotId && currImage.preview === true) {
        currSpot.previewImage = currImage.url;
        delete currSpot.description;
        delete currSpot.createdAt;
        delete currSpot.updatedAt;
      }
    }
    // iterate all reviews and add the spot being reviewed for the
    // response
    for (let j = 0; j < reviewData.length; j++) {
      let currRev = reviewData[j].dataValues;
      if (currRev.spotId === currSpot.id) {
        currRev.Spot = currSpot;
      }
    }
  }
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
    return res.status(403).json({ message: "Forbidden" });

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

  // const returnData = {
  //   id: reviewId,
  //   userId: currUser.id,
  //   spotId: reviewData.spotId,
  //   review,
  //   stars,
  //   createdAt: `${reviewData.createdAt.toISOString().split("T")[0]} ${
  //     reviewData.createdAt.toISOString().split("T")[1].split(".")[0]
  //   }`,
  //   updatedAt: `${reviewData.createdAt.toISOString().split("T")[0]} ${
  //     reviewData.createdAt.toISOString().split("T")[1].split(".")[0]
  //   }`,
  // };

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
