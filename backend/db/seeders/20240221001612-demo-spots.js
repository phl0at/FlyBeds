"use strict";

const { Spot } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "1234 Craptown Dr",
          city: "Birmingham",
          state: "Alabama",
          country: "USA",
          lat: 33.5186,
          lng: -86.8104,
          name: "Southern Comfort",
          description: "It is what it is, yo",
          price: 10000,
        },
        {
          ownerId: 1,
          address: "3385 Mary Taylor Dr",
          city: "Birmingham",
          state: "Alabama",
          country: "USA",
          lat: 33.5132,
          lng: -86.8169,
          name: "The Bay",
          description: "There's no bay here...",
          price: 1,
        },
        {
          ownerId: 2,
          address: "1914 Sliced Cheese Dr",
          city: "Oldsmar",
          state: "Florida",
          country: "USA",
          lat: 28.0342,
          lng: -82.6651,
          name: "Retirement",
          description: "The spot for newly-weds and nearly-deads",
          price: 69,
        },
        {
          ownerId: 3,
          address: "420 Blaze Dr",
          city: "Sacramento",
          state: "California",
          country: "USA",
          lat: 38.5816,
          lng: -121.4944,
          name: "The Heights",
          description: "Everything's high but the price",
          price: 420,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: ["Southern Comfort", "The Bay", "Retirement", "The Heights"],
        },
      },
      {}
    );
  },
};
