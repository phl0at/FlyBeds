"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, { foreignKey: "userId" });
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
      Review.hasMany(models.ReviewImage, { foreignKey: "reviewId" });
    }
  }
  Review.init(
    {
      userId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
      review: DataTypes.STRING,
      stars: DataTypes.INTEGER,
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
      modelName: "Review",
    }
  );
  return Review;
};
