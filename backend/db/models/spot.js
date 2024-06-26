"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: "ownerId", as: "Owner" });
      Spot.hasMany(models.Review, { foreignKey: "spotId" });
      Spot.hasMany(models.Booking, { foreignKey: "spotId" });
      Spot.hasMany(models.SpotImage, { foreignKey: "spotId" });
    }
  }
  Spot.init(
    {
      ownerId: DataTypes.INTEGER,
      address: {
        type: DataTypes.STRING,
      },
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      lat: {
        type: DataTypes.FLOAT,
        validate: {
          min: -90,
          max: 90,
        },
      },
      lng: {
        type: DataTypes.FLOAT,
        validate: {
          min: -180,
          max: 180,
        },
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING(500),
      price: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        get() {
          if (!this.dataValues.createdAt) return null;
          const date = new Date(`${this.dataValues.createdAt}`);
          return `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString(
            "it-IT"
          )}`;
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          if (!this.dataValues.updatedAt) return null;
          const date = new Date(`${this.dataValues.updatedAt}`);
          return `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString(
            "it-IT"
          )}`;
        },
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
