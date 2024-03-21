"use strict";
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "imgur.com/interior1",
          preview: false
        },
        {
          spotId: 1,
          url: "imgur.com/exterior1",
          preview: true
        },
        {
          spotId: 2,
          url: "imgur.com/interior2",
          preview: false
        },
        {
          spotId: 2,
          url: "imgur.com/exterior2",
          preview: true
        },
        {
          spotId: 3,
          url: "imgur.com/interior3",
          preview: false
        },
        {
          spotId: 3,
          url: "imgur.com/exterior3",
          preview: true
        },
        {
          spotId: 4,
          url: "imgur.com/interior4",
          preview: false
        },
        {
          spotId: 4,
          url: "imgur.com/exterior4",
          preview: true
        },
        {
          spotId: 5,
          url: "imgur.com/interior5",
          preview: false
        },
        {
          spotId: 5,
          url: "imgur.com/exterior5",
          preview: true
        },
        {
          spotId: 6,
          url: "imgur.com/interior6",
          preview: false
        },
        {
          spotId: 6,
          url: "imgur.com/exterior6",
          preview: true
        },
        {
          spotId: 7,
          url: "imgur.com/interior7",
          preview: false
        },
        {
          spotId: 7,
          url: "imgur.com/exterior7",
          preview: true
        },
        {
          spotId: 8,
          url: "imgur.com/interior8",
          preview: false
        },
        {
          spotId: 8,
          url: "imgur.com/exterior8",
          preview: true
        },
        {
          spotId: 9,
          url: "imgur.com/interior9",
          preview: false
        },
        {
          spotId: 9,
          url: "imgur.com/exterior9",
          preview: true
        },
        {
          spotId: 10,
          url: "imgur.com/interior10",
          preview: false
        },
        {
          spotId: 10,
          url: "imgur.com/exterior10",
          preview: true
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
