const { User, Auth } = require("../db/models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const getAllUsers = async (req, res) => {
  const users = await User.findAll();

  return res.status(200).json({
    status: "Success",
    message: "All users fetched successfully",
    data: users,
    isError: false,
    isSuccess: true,
  });
};

module.exports = {
  getAllUsers,
};
