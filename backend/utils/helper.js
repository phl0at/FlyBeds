const { Op } = require("sequelize");

// --- SET UP QUERY PARAMS ---

const setQueries = (minLat, maxLat, minLng, maxLng, minPrice, maxPrice) => {
  let where = {};
  if (minLat) where.lat = { [Op.gte]: minLat };
  if (maxLat) where.lat = { [Op.lte]: maxLat };
  if (minLat && maxLat) where.lat = { [Op.gte]: minLat, [Op.lte]: maxLat };
  if (minLng) where.lng = { [Op.gte]: minLng };
  if (maxLng) where.lng = { [Op.lte]: maxLng };
  if (minLng && maxLng) where.lng = { [Op.gte]: minLng, [Op.lte]: maxLng };
  if (minPrice) where.price = { [Op.gte]: minPrice };
  if (maxPrice) where.price = { [Op.lte]: maxPrice };
  if (minPrice && maxPrice)
    where.price = { [Op.gte]: minPrice, [Op.lte]: maxPrice };

  return where;
};

// --- FORMAT ONE SPOT ---

const formatOneSpot = (spotData, reviewData) => {
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

  return spotData;
};

// --- FORMAT ARRAY OF SPOTS ---

const formatSpotsArray = (spotData) => {
  //iterate each spot and set up default values for image and rating
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

  return spotData;
};


const confirmReviewExists = (reviewData, res) => {
  if (!reviewData)
    return res.status(404).json({ message: "Review couldn't be found" });
};

module.exports = {
  setQueries,
  formatSpotsArray,
  formatOneSpot,
  confirmReviewExists
};
