"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init(
    {
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      createdBy: {
        type: DataTypes.STRING,
        defaultValue: "Admin",
      },
      deletedBy: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      lastUpdatedBy: {
        type: DataTypes.STRING,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Car",
      paranoid: true,
    }
  );
  return Car;
};
