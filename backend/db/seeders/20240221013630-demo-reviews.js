"use strict";
const { Review } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          userId: 1,
          spotId: 2,
          review: "User 1 Spot 2",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 3,
          review: "User 2 Spot 3",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 4,
          review: "User 3 Spot 4",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 5,
          review: "User 4 Spot 5",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 6,
          review: "User 5 Spot 6",
          stars: 5,
        },
        {
          userId: 6,
          spotId: 7,
          review: "User 6 Spot 7",
          stars: 5,
        },
        {
          userId: 6,
          spotId: 8,
          review: "User 6 Spot 8",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 9,
          review: "User 5 Spot 9",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 10,
          review: "User 4 Spot 10",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 1,
          review: "User 3 Spot 1",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 1,
          review: "User 2 Spot 1",
          stars: 1,
        },
        {
          userId: 1,
          spotId: 10,
          review: "User 1 Spot 10",
          stars: 1,
        },
        {
          userId: 2,
          spotId: 9,
          review: "User 2 Spot 9",
          stars: 1,
        },
        {
          userId: 3,
          spotId: 8,
          review: "User 3 Spot 8",
          stars: 1,
        },
        {
          userId: 4,
          spotId: 7,
          review: "User 4 Spot 7",
          stars: 1,
        },
        {
          userId: 5,
          spotId: 6,
          review: "User 5 Spot 6",
          stars: 1,
        },
        {
          userId: 4,
          spotId: 5,
          review: "User 4 Spot 5",
          stars: 1,
        },
        {
          userId: 3,
          spotId: 4,
          review: "User 3 Spot 4",
          stars: 1,
        },
        {
          userId: 2,
          spotId: 3,
          review: "User 2 Spot 3",
          stars: 1,
        },
        {
          userId: 1,
          spotId: 2,
          review: "User 1 Spot 2",
          stars: 1,
        },
        {
          userId: 6,
          spotId: 3,
          review: "User 6 Spot 3",
          stars: 3,
        },
        {
          userId: 5,
          spotId: 10,
          review: "User 5 Spot 10",
          stars: 3,
        },
        {
          userId: 4,
          spotId: 8,
          review: "User 4 Spot 8",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 6,
          review: "User 3 Spot 6",
          stars: 3,
        },
        {
          userId: 2,
          spotId: 4,
          review: "User 2 Spot 4",
          stars: 3,
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
