"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo1@user.io",
          username: "Demo1",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo2@user.io",
          username: "Demo2",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo3@user.io",
          username: "Demo3",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo4@user.io",
          username: "Demo4",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo5@user.io",
          username: "Demo5",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo6@user.io",
          username: "Demo6",
          hashedPassword: bcrypt.hashSync("password6"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
