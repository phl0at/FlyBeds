"use strict";
const { Booking } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        userId: 1,
        spotId: 2,
        startDate: "01-01-2060",
        endDate: "01-04-2060",
      },
      {
        userId: 2,
        spotId: 3,
        startDate: "01-01-2060",
        endDate: "01-04-2060",
      },
      {
        userId: 3,
        spotId: 4,
        startDate: "01-01-2060",
        endDate: "01-04-2060",
      },
      {
        userId: 4,
        spotId: 5,
        startDate: "01-01-2060",
        endDate: "01-04-2060",
      },
      {
        userId: 5,
        spotId: 6,
        startDate: "01-01-2060",
        endDate: "01-04-2060",
      },
      {
        userId: 6,
        spotId: 7,
        startDate: "01-01-2060",
        endDate: "01-04-2060",
      },
      {
        userId: 6,
        spotId: 8,
        startDate: "01-01-2060",
        endDate: "01-04-2060",
      },
      {
        userId: 5,
        spotId: 9,
        startDate: "01-01-2060",
        endDate: "01-04-2060",
      },
      {
        userId: 4,
        spotId: 10,
        startDate: "01-01-2060",
        endDate: "01-04-2060",
      },
      {
        userId: 3,
        spotId: 1,
        startDate: "02-05-2061",
        endDate: "02-10-2061",
      },
      {
        userId: 2,
        spotId: 1,
        startDate: "02-11-2061",
        endDate: "02-15-2061",
      },
      {
        userId: 1,
        spotId: 10,
        startDate: "02-05-2061",
        endDate: "02-10-2061",
      },
      {
        userId: 2,
        spotId: 9,
        startDate: "02-05-2061",
        endDate: "02-10-2061",
      },
      {
        userId: 3,
        spotId: 8,
        startDate: "02-05-2061",
        endDate: "02-10-2061",
      },
      {
        userId: 4,
        spotId: 7,
        startDate: "02-05-2061",
        endDate: "02-10-2061",
      },
      {
        userId: 5,
        spotId: 6,
        startDate: "02-05-2061",
        endDate: "02-10-2061",
      },
      {
        userId: 4,
        spotId: 5,
        startDate: "02-05-2061",
        endDate: "02-10-2061",
      },
      {
        userId: 3,
        spotId: 4,
        startDate: "02-05-2061",
        endDate: "02-10-2061",
      },
      {
        userId: 2,
        spotId: 3,
        startDate: "02-05-2061",
        endDate: "02-10-2061",
      },
      {
        userId: 1,
        spotId: 2,
        startDate: "02-05-2061",
        endDate: "02-10-2061",
      },
      {
        userId: 6,
        spotId: 3,
        startDate: "03-01-2061",
        endDate: "03-04-2061",
      },
      {
        userId: 5,
        spotId: 10,
        startDate: "03-01-2061",
        endDate: "03-04-2061",
      },
      {
        userId: 4,
        spotId: 8,
        startDate: "03-01-2061",
        endDate: "03-04-2061",
      },
      {
        userId: 3,
        spotId: 6,
        startDate: "03-01-2061",
        endDate: "03-04-2061",
      },
      {
        userId: 2,
        spotId: 4,
        startDate: "03-01-2061",
        endDate: "03-04-2061",
      },
    ],
    { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
