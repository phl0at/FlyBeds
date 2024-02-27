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
        startDate: "01-01-2023",
        endDate: "01-04-2023",
      },
      {
        userId: 2,
        spotId: 3,
        startDate: "01-01-2023",
        endDate: "01-04-2023",
      },
      {
        userId: 3,
        spotId: 4,
        startDate: "01-01-2023",
        endDate: "01-04-2023",
      },
      {
        userId: 4,
        spotId: 5,
        startDate: "01-01-2023",
        endDate: "01-04-2023",
      },
      {
        userId: 5,
        spotId: 6,
        startDate: "01-01-2023",
        endDate: "01-04-2023",
      },
      {
        userId: 6,
        spotId: 7,
        startDate: "01-01-2023",
        endDate: "01-04-2023",
      },
      {
        userId: 6,
        spotId: 8,
        startDate: "01-01-2023",
        endDate: "01-04-2023",
      },
      {
        userId: 5,
        spotId: 9,
        startDate: "01-01-2023",
        endDate: "01-04-2023",
      },
      {
        userId: 4,
        spotId: 10,
        startDate: "01-01-2023",
        endDate: "01-04-2023",
      },
      {
        userId: 3,
        spotId: 1,
        startDate: "02-05-2024",
        endDate: "02-10-2024",
      },
      {
        userId: 2,
        spotId: 1,
        startDate: "02-11-2024",
        endDate: "02-15-2024",
      },
      {
        userId: 1,
        spotId: 10,
        startDate: "02-05-2024",
        endDate: "02-10-2024",
      },
      {
        userId: 2,
        spotId: 9,
        startDate: "02-05-2024",
        endDate: "02-10-2024",
      },
      {
        userId: 3,
        spotId: 8,
        startDate: "02-05-2024",
        endDate: "02-10-2024",
      },
      {
        userId: 4,
        spotId: 7,
        startDate: "02-05-2024",
        endDate: "02-10-2024",
      },
      {
        userId: 5,
        spotId: 6,
        startDate: "02-05-2024",
        endDate: "02-10-2024",
      },
      {
        userId: 4,
        spotId: 5,
        startDate: "02-05-2024",
        endDate: "02-10-2024",
      },
      {
        userId: 3,
        spotId: 4,
        startDate: "02-05-2024",
        endDate: "02-10-2024",
      },
      {
        userId: 2,
        spotId: 3,
        startDate: "02-05-2024",
        endDate: "02-10-2024",
      },
      {
        userId: 1,
        spotId: 2,
        startDate: "02-05-2024",
        endDate: "02-10-2024",
      },
      {
        userId: 6,
        spotId: 3,
        startDate: "03-01-2024",
        endDate: "03-04-2024",
      },
      {
        userId: 5,
        spotId: 10,
        startDate: "03-01-2024",
        endDate: "03-04-2024",
      },
      {
        userId: 4,
        spotId: 8,
        startDate: "03-01-2024",
        endDate: "03-04-2024",
      },
      {
        userId: 3,
        spotId: 6,
        startDate: "03-01-2024",
        endDate: "03-04-2024",
      },
      {
        userId: 2,
        spotId: 4,
        startDate: "03-01-2024",
        endDate: "03-04-2024",
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
