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
const { Booking } = require("../../db/models");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
  const currUser = req.user.dataValues;
  const bookData = await Booking.findAll({
    where: {
      userId: currUser.id,
    },
  });
  const spotData = await Spot.findAll();
  const spotImages = await SpotImage.findAll();

  for (let i = 0; i < spotData.length; i++) {
    let currSpot = spotData[i].dataValues;

    for (let k = 0; k < spotImages.length; k++) {
      let currImage = spotImages[k].dataValues;
      if (currSpot.id === currImage.spotId && currImage.preview === true) {
        currSpot.previewImage = currImage.url;
        delete currSpot.description;
        delete currSpot.createdAt;
        delete currSpot.updatedAt;
      }
    }
    for (let j = 0; j < bookData.length; j++) {
      let currBook = bookData[j].dataValues;

      if (currSpot.id === currBook.spotId) {
        currBook.Spot = currSpot;
      }
    }
  }

  return res.json({ Bookings: bookData });
});

module.exports = router;
