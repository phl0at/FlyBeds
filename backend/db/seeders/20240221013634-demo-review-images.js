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
          url: "URL 1",
        },
        {
          reviewId: 2,
          url: "URL 2",
        },
        {
          reviewId: 3,
          url: "URL 3",
        },
        {
          reviewId: 4,
          url: "URL 4",
        },
        {
          reviewId: 5,
          url: "URL 5",
        },
        {
          reviewId: 6,
          url: "URL 6",
        },
        {
          reviewId: 7,
          url: "URL 7",
        },
        {
          reviewId: 8,
          url: "URL 8",
        },
        {
          reviewId: 9,
          url: "URL 9",
        },
        {
          reviewId: 10,
          url: "URL 10",
        },
        {
          reviewId: 11,
          url: "URL 11",
        },
        {
          reviewId: 12,
          url: "URL 12",
        },
        {
          reviewId: 13,
          url: "URL 13",
        },
        {
          reviewId: 14,
          url: "URL 14",
        },
        {
          reviewId: 15,
          url: "URL 15",
        },
        {
          reviewId: 16,
          url: "URL 16",
        },
        {
          reviewId: 17,
          url: "URL 17",
        },
        {
          reviewId: 18,
          url: "URL 18",
        },
        {
          reviewId: 19,
          url: "URL 19",
        },
        {
          reviewId: 20,
          url: "URL 20",
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
