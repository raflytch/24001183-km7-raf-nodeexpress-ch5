const { User, Auth } = require("../db/models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const getAllUsers = async (req, res, next) => {
  try {
    const { name, age, role, limit = 10, page = 1 } = req.query;

    const usersCondition = {};

    if (name) {
      usersCondition.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (age) {
      usersCondition.age = {
        [Op.gte]: parseInt(age),
      };
    }

    if (role) {
      usersCondition.role = {
        [Op.iLike]: `%${role}%`,
      };
    }

    const authCondition = {};

    let prevPage = page - 1;

    if (prevPage < 1) {
      prevPage = 1;
    }

    const offset = (page - 1) * limit;

    const users = await User.findAll({
      where: usersCondition,
      limit: limit,
      offset: offset,
      include: [
        {
          model: Auth,
          as: "Auth",
          where: authCondition,
          attributes: ["id", "email"],
        },
      ],
      order: [["id", "ASC"]],
    });

    const totalData = await User.count({
      where: usersCondition,
    });

    const totalPage = Math.ceil(totalData / limit);

    let nextPage = Number(page) + 1;

    if (nextPage > totalPage) {
      nextPage = totalPage;
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully get users from the database",
      data: {
        users,
        totalData,
        totalPage,
        nextPage,
        prevPage,
      },
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Auth,
          as: "Auth",
          attributes: ["id", "email"],
        },
      ],
    });

    if (!user || user.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully get user from the database",
      data: user,
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const createUserAdmin = async (req, res, next) => {
  try {
    const { username, email, password, age, address } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        status: "Error",
        message: "All fields are required",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const user = await Auth.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(400).json({
        status: "Error",
        message: "User already exists",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdminUser = await User.create({
      name: username,
      role: "Admin",
      age: age,
      address: address,
    });

    const newAuthUser = await Auth.create({
      email: email,
      password: hashedPassword,
      userId: newAdminUser.id,
    });

    res.status(201).json({
      status: "Success",
      message: "Successfully create user",
      data: newAdminUser,
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, address, role } = req.body;

    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user || user.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const updatedBy = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (!updatedBy || updatedBy === null || updatedBy.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    await User.update(
      {
        name,
        address,
        role,
      },
      {
        where: {
          id,
        },
      }
    );

    const updatedUser = await User.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "role", "address"],
    });

    res.status(200).json({
      status: "Success",
      message: "Successfully update user",
      data: {
        updatedUser: updatedUser,
        updatedBy: updatedBy.name,
        lastUpdatedBy: updatedBy.name,
      },
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user || user.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const deletedBy = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (!deletedBy || deletedBy === null || deletedBy.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    await User.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Successfully delete user",
      deletedBy: deletedBy.name,
      lastDeletedBy: deletedBy.name,
      data: null,
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUserAdmin,
  updateUser,
  deleteUser,
};
