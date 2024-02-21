"use strict";
const { ReviewImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: "imgur.com/BustedUpDoor",
        },
        {
          reviewId: 2,
          url: "imgur.com/LovelyPatio",
        },
        {
          reviewId: 3,
          url: "imgur.com/PoopOnPatio",
        },
        {
          reviewId: 4,
          url: "imgur.com/OldCheese",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        reviewId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
