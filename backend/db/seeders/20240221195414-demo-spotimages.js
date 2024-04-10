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
          url: "https://t3.ftcdn.net/jpg/01/18/46/52/240_F_118465200_0q7Of6UnbA8kDlYEe3a4PuIyue27fbuV.jpg",
          preview: true
        },
        {
          spotId: 2,
          url: "imgur.com/interior2",
          preview: false
        },
        {
          spotId: 2,
          url: "https://t3.ftcdn.net/jpg/04/27/70/64/240_F_427706432_OTNX01bqkZttcIX9sht4SxvjBm6xJHEX.jpg",
          preview: true
        },
        {
          spotId: 3,
          url: "imgur.com/interior3",
          preview: false
        },
        {
          spotId: 3,
          url: "https://t4.ftcdn.net/jpg/03/61/16/25/240_F_361162520_bgRKQmlB8lm2Z45NQ7GBaNT675tMOCGq.jpg",
          preview: true
        },
        {
          spotId: 4,
          url: "imgur.com/interior4",
          preview: false
        },
        {
          spotId: 4,
          url: "https://t3.ftcdn.net/jpg/04/32/56/22/240_F_432562253_0AJEmoX8idRHQiBDCCgHjdsHUBZG7ppx.jpg",
          preview: true
        },
        {
          spotId: 5,
          url: "imgur.com/interior5",
          preview: false
        },
        {
          spotId: 5,
          url: "https://t3.ftcdn.net/jpg/00/62/13/24/240_F_62132429_pw8W4rc1qLlCAP9SS9pPFDZyyPJZHwpw.jpg",
          preview: true
        },
        {
          spotId: 6,
          url: "imgur.com/interior6",
          preview: false
        },
        {
          spotId: 6,
          url: "https://t4.ftcdn.net/jpg/04/37/54/23/240_F_437542364_rUKRUDlOQ2ZmVrsijNFUfrhxZO7jyOFg.jpg",
          preview: true
        },
        {
          spotId: 7,
          url: "imgur.com/interior7",
          preview: false
        },
        {
          spotId: 7,
          url: "https://t3.ftcdn.net/jpg/05/09/62/16/240_F_509621631_5o3hQKN5vzNVFMdOj68uyBCNUFNlxAX8.jpg",
          preview: true
        },
        {
          spotId: 8,
          url: "imgur.com/interior8",
          preview: false
        },
        {
          spotId: 8,
          url: "https://t4.ftcdn.net/jpg/02/31/77/23/240_F_231772318_uX8dIX7qM03DufXhskCGSzD5qUxT6eFr.jpg",
          preview: true
        },
        {
          spotId: 9,
          url: "imgur.com/interior9",
          preview: false
        },
        {
          spotId: 9,
          url: "https://t3.ftcdn.net/jpg/02/05/30/94/240_F_205309444_CHwsFjT0w09gqyzi1zP8ahPHyLiT0K62.jpg",
          preview: true
        },
        {
          spotId: 10,
          url: "imgur.com/interior10",
          preview: false
        },
        {
          spotId: 10,
          url: "https://t4.ftcdn.net/jpg/01/18/15/73/240_F_118157330_XLIftnU5HZOmknLpnqCw9P3LjEm5dTT1.jpg",
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
