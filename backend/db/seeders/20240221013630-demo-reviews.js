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
          userId: 2,
          spotId: 3,
          review: "ABSOLUTELY DIVINE! PRAISE THE SCARLET CRUSADE!",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 4,
          review:
            "I snuck in through the chimney and stole the guacamole. Nobody even noticed.",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 5,
          review: "Day 3058 of being mad about the guy who killed my dog.",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 6,
          review: "They didn't even have an umbrella-ella-ella...",
          stars: 5,
        },
        {
          userId: 6,
          spotId: 7,
          review: "Yippe kai-awhatever he saz. This place was grate!",
          stars: 5,
        },
        {
          userId: 6,
          spotId: 8,
          review: "Very absorbant curtains!",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 9,
          review: "This place shines bright like a diorama of the solar system",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 10,
          review: "Quaint. Not like that place in Zurich.",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 1,
          review: "Nice place...For a peasant.",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 10,
          review: "Demo-origato. Mr Roboto.",
          stars: 1,
        },
        {
          userId: 2,
          spotId: 9,
          review: "Looks like the Sims house I burned down with the family still inside.",
          stars: 1,
        },
        {
          userId: 3,
          spotId: 8,
          review: "Couldn't land my helicopter on the roof. Complete waste of time.",
          stars: 1,
        },
        {
          userId: 4,
          spotId: 7,
          review: "Follow the white rabbit.",
          stars: 1,
        },
        {
          userId: 2,
          spotId: 5,
          review: "Too much white everywhere.",
          stars: 1,
        },
        {
          userId: 1,
          spotId: 2,
          review: "HOW MANY REVIEWS DO WE REALLY NEED HERE? LET'S BE HONEST.",
          stars: 1,
        },
        {
          userId: 6,
          spotId: 3,
          review: "Slept like a baby balooga basking on the Burmese bank.",
          stars: 3,
        },
        {
          userId: 5,
          spotId: 10,
          review: "Owner was a rude boy.",
          stars: 3,
        },
        {
          userId: 4,
          spotId: 8,
          review: "OK THIS IS ENOUGH REVIEWS ALREADY!",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 6,
          review: "It's almost as beautiful as YOU are.",
          stars: 3,
        },
        {
          userId: 2,
          spotId: 4,
          review: "BASK IN THE RADIANT GLORY OF THE SCARLET SUN!",
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
