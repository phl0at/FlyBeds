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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo vel fringilla est ullamcorper eget nulla facilisi..",
          price: 140,
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
          description:
            "Purus in mollis nunc sed id semper risus. Ac turpis egestas integer eget aliquet nibh praesent tristique magna.",
          price: 750,
        },
        {
          ownerId: 3,
          address: "333 Demo Dr",
          city: "Demo City",
          state: "Florida",
          country: "USA",
          lat: 32,
          lng: -82,
          name: "Demonstration Station",
          description: "Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Sit amet consectetur adipiscing elit duis tristique. Ultricies leo integer malesuada nunc vel. Lorem sed risus ultricies tristique nulla aliquet enim tortor.",
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
          description:
            "Risus sed vulputate odio ut. Id diam vel quam elementum pulvinar etiam. Tempus quam pellentesque nec nam aliquam sem et. Libero enim sed faucibus turpis in eu. Vulputate ut pharetra sit amet aliquam id diam maecenas. Vel facilisis volutpat est velit. Vitae et leo duis ut. Arcu cursus vitae congue mauris rhoncus aenean. ",
          price: 42,
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
          description:
            "Ut tristique et egestas quis ipsum suspendisse. Vitae congue mauris rhoncus aenean. Iaculis eu non diam phasellus vestibulum lorem sed. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Consectetur adipiscing elit ut aliquam purus. Nisl condimentum id venenatis a.",
          price: 155,
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
          description:
            "Ut tristique et egestas quis ipsum suspendisse. Vitae congue mauris rhoncus aenean. Iaculis eu non diam phasellus vestibulum lorem sed. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Consectetur adipiscing elit ut aliquam purus. Nisl condimentum id venenatis a. Pulvinar mattis nunc sed blandit.",
          price: 666,
        },
        {
          ownerId: 1,
          address: "777 Lucky Ln",
          city: "Bonita Springs",
          state: "Florida",
          country: "USA",
          lat: 36,
          lng: -86,
          name: "Lil t's Crib",
          description:
            "Perfect for anyone who finds themselves vertically challenged!",
          price: 777,
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
          description:
            "Risus sed vulputate odio ut. Id diam vel quam elementum pulvinar etiam. Tempus quam pellentesque nec nam aliquam sem et. Libero enim sed faucibus turpis in eu. Vulputate ut pharetra sit amet aliquam id diam maecenas. Vel facilisis volutpat est velit. Vitae et leo duis ut. Arcu cursus vitae congue mauris rhoncus aenean. Vitae ultricies leo integer malesuada nunc.",
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
          description:
            "Amet nulla facilisi morbi tempus iaculis urna. Ornare lectus sit amet est placerat. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Pharetra et ultrices neque ornare. Vitae congue eu consequat ac. Morbi blandit cursus risus at ultrices mi. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Erat nam at lectus urna duis convallis convallis tellus.",
          price: 715,
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
          description:
            "Purus in mollis nunc sed id semper risus. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Sit amet consectetur adipiscing elit duis tristique. Ultricies leo integer malesuada nunc vel. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Praesent tristique magna sit amet purus gravida quis. Massa sed elementum tempus egestas sed.",
          price: 1010,
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
