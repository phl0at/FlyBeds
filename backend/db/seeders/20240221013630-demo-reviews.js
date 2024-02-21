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
          userId: 3,
          spotId: 1,
          review: "CRAPTOWN AT ITS FINEST",
          stars: 1,
        },
        {
          userId: 2,
          spotId: 1,
          review: "Honestly a really nice place",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 1,
          review: "Second stay and DEFINITELY the last",
          stars: 1,
        },
        {
          userId: 1,
          spotId: 3,
          review: "Just a bunch of old people and cheese, yo",
          stars: 3,
        },
      ],
      { validate: true }
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
