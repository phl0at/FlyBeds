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
          address: "111 Fake Dr",
          city: "Fake City",
          state: "Florida",
          country: "USA",
          lat: 30.0,
          lng: -80.0,
          name: "Not a Spot",
          description: "First fake spot! So cool!",
          price: 124,
        },
        {
          ownerId: 2,
          address: "222 Faux St",
          city: "Fauxopolis",
          state: "Florida",
          country: "USA",
          lat: 31,
          lng: -81,
          name: "Faux Real",
          description: "Faux sho the place to go!",
          price: 75,
        },
        {
          ownerId: 3,
          address: "333 Demo Dr",
          city: "Demo City",
          state: "Florida",
          country: "USA",
          lat: 32,
          lng: -82,
          name: "Demo-lishing the Competition",
          description: "Demo-litious in every way",
          price: 200,
        },
        {
          ownerId: 4,
          address: "444 Sky Ln",
          city: "Airhead Town",
          state: "Florida",
          country: "USA",
          lat: 33,
          lng: -83,
          name: "Hot Air",
          description: "Nothing to see here",
          price: 1,
        },
        {
          ownerId: 5,
          address: "555 Drive St",
          city: "City City",
          state: "Florida",
          country: "USA",
          lat: 34,
          lng: -84,
          name: "A Place",
          description: "Definitely something",
          price: 5,
        },
        {
          ownerId: 6,
          address: "666 Rafael Dr",
          city: "Sin City",
          state: "Florida",
          country: "USA",
          lat: 35,
          lng: -85,
          name: "The House of Hope",
          description: "And that, love, was that",
          price: 666,
        },
        {
          ownerId: 1,
          address: "777 Lucky Ln",
          city: "Seventh City",
          state: "Florida",
          country: "USA",
          lat: 36,
          lng: -86,
          name: "The Spot",
          description: "Good luck",
          price: 77,
        },
        {
          ownerId: 2,
          address: "888 Figure St",
          city: "Infinicity",
          state: "Florida",
          country: "USA",
          lat: 37,
          lng: -87,
          name: "The Forever Home",
          description: "You will never leave.",
          price: 500,
        },
        {
          ownerId: 3,
          address: "999 Gag Dr",
          city: "Troll City",
          state: "Florida",
          country: "USA",
          lat: 38,
          lng: -88,
          name: "Pepe's House",
          description: "REEEEEEE",
          price: 10000,
        },
        {
          ownerId: 4,
          address: "10101101 Binary St",
          city: "Chip City",
          state: "Florida",
          country: "USA",
          lat: 39,
          lng: -89,
          name: "Beep Boop",
          description: "Undefined",
          price: 100000,
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
