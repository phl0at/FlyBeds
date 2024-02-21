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
        userId: 3,
        spotId: 1,
        startDate: "01-01-2024",
        endDate: "01-04-2024",
      },
      {
        userId: 2,
        spotId: 1,
        startDate: "01-10-2024",
        endDate: "01-14-2024",
      },
      {
        userId: 2,
        spotId: 1,
        startDate: "02-01-2024",
        endDate: "02-04-2024",
      },
      {
        userId: 1,
        spotId: 3,
        startDate: "02-05-2024",
        endDate: "02-10-2024",
      },
    ]);
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
