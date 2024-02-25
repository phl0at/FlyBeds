"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: "userId" });
      Booking.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  Booking.init(
    {
      userId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
      startDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
        get() {
          const date = new Date(`${this.dataValues.startDate}`);
          return `${date.toISOString().split("T")[0]}`;
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
        get() {
          const date = new Date(`${this.dataValues.endDate}`);
          return `${date.toISOString().split("T")[0]}`;
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        get() {
          const date = new Date(`${this.dataValues.createdAt}`);
          return `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString(
            "it-IT"
          )}`;
        },
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        get() {
          const date = new Date(`${this.dataValues.updatedAt}`);
          return `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString(
            "it-IT"
          )}`;
        },
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
