"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Auth, {
        foreignKey: {
          name: "userId",
          as: "Auth",
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
      address: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM(["Superadmin", "Admin", "Member"]),
        allowNull: false,
        defaultValue: "Member",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
