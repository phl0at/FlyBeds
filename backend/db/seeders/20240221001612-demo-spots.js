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
          address: "1 Demo Dr",
          city: "Demo 1",
          state: "Florida",
          country: "USA",
          lat: 30,
          lng: -80,
          name: "Demo 1",
          description: "Demo 1",
          price: 10000,
        },
        {
          ownerId: 2,
          address: "2 Demo Dr",
          city: "Demo 2",
          state: "Florida",
          country: "USA",
          lat: 31,
          lng: -81,
          name: "Demo 2",
          description: "Demo 2",
          price: 10000,
        },
        {
          ownerId: 3,
          address: "3 Demo Dr",
          city: "Demo 3",
          state: "Florida",
          country: "USA",
          lat: 32,
          lng: -82,
          name: "Demo 3",
          description: "Demo 3",
          price: 10000,
        },
        {
          ownerId: 4,
          address: "4 Demo Dr",
          city: "Demo 4",
          state: "Florida",
          country: "USA",
          lat: 33,
          lng: -83,
          name: "Demo 4",
          description: "Demo 4",
          price: 10000,
        },
        {
          ownerId: 5,
          address: "5 Demo Dr",
          city: "Demo 5",
          state: "Florida",
          country: "USA",
          lat: 34,
          lng: -84,
          name: "Demo 5",
          description: "Demo 5",
          price: 10000,
        },
        {
          ownerId: 6,
          address: "6 Demo Dr",
          city: "Demo 6",
          state: "Florida",
          country: "USA",
          lat: 35,
          lng: -85,
          name: "Demo 6",
          description: "Demo 6",
          price: 10000,
        },
        {
          ownerId: 1,
          address: " Demo Dr",
          city: "Demo 7",
          state: "Florida",
          country: "USA",
          lat: 36,
          lng: -86,
          name: "Demo 7",
          description: "Demo 7",
          price: 10000,
        },
        {
          ownerId: 2,
          address: "8 Demo Dr",
          city: "Demo 8",
          state: "Florida",
          country: "USA",
          lat: 37,
          lng: -87,
          name: "Demo 8",
          description: "Demo 8",
          price: 10000,
        },
        {
          ownerId: 3,
          address: "9 Demo Dr",
          city: "Demo 9",
          state: "Florida",
          country: "USA",
          lat: 38,
          lng: -88,
          name: "Demo 9",
          description: "Demo 9",
          price: 10000,
        },
        {
          ownerId: 4,
          address: "10 Demo Dr",
          city: "Demo 10",
          state: "Florida",
          country: "USA",
          lat: 39,
          lng: -89,
          name: "Demo 10",
          description: "Demo 10",
          price: 10000,
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
