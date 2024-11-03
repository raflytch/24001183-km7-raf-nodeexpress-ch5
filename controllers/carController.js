const { Car, User } = require("../db/models");
const imagekit = require("../lib/imagekit");
const { Op } = require("sequelize");

const getAllAvailableCars = async (req, res, next) => {
  try {
    const {
      model,
      type,
      price,
      maxPrice,
      minPrice,
      isAvaliable,
      limit = 10,
      page = 1,
    } = req.query;

    if (minPrice !== undefined && isNaN(parseFloat(minPrice))) {
      return res.status(400).json({
        status: "Error",
        message: "Minimum price must be a valid number",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    if (maxPrice !== undefined && isNaN(parseFloat(maxPrice))) {
      return res.status(400).json({
        status: "Error",
        message: "Maximum price must be a valid number",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
      return res.status(400).json({
        status: "Error",
        message: "Minimum price must be less than or equal to maximum price",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const condition = {};

    if (model) {
      condition.model = {
        [Op.iLike]: `%${model}%`,
      };
    }

    if (type) {
      condition.type = {
        [Op.iLike]: `%${type}%`,
      };
    }

    if (price) {
      condition.price = {
        [Op.gte]: parseFloat(price),
      };
    }

    if (minPrice && maxPrice) {
      condition.price = {
        [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)],
      };
    } else if (minPrice) {
      condition.price = {
        [Op.gte]: parseFloat(minPrice),
      };
    } else if (maxPrice) {
      condition.price = {
        [Op.lte]: parseFloat(maxPrice),
      };
    }

    if (isAvaliable) {
      condition.isAvaliable = isAvaliable;
    }

    let prevPage = page - 1;

    if (prevPage < 1) {
      prevPage = 1;
    }

    const offset = (page - 1) * limit;

    const cars = await Car.findAll({
      where: condition,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    const totalData = await Car.count({
      where: condition,
    });

    const totalPages = Math.ceil(totalData / limit);

    let nextPage = Number(page) + 1;

    if (nextPage > totalPages) {
      nextPage = totalPages;
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully get cars from the database",
      data: {
        cars,
        totalData,
        totalPages,
        prevPage,
        nextPage,
      },
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);

      return res.status(400).json({
        status: "Error",
        message: errorMessage,
        data: null,
        isError: true,
        isSuccess: false,
      });
    }
    next(error);
  }
};

const getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findOne({
      where: {
        id: id,
      },
    });

    if (!car || car.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Car not found",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully get car from the database",
      data: car,
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const createCar = async (req, res, next) => {
  try {
    const { model, type, price } = req.body;

    if (!model || !type || !price) {
      return res.status(400).json({
        status: "Error",
        message: "Model, type and price are required",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        status: "Error",
        message: "Failed to upload image",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const uploadedImage = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    if (!uploadedImage) {
      return res.status(400).json({
        status: "Error",
        message: "Failed to upload image",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const car = await Car.create({
      model,
      type,
      price,
      createdBy: req.user.name,
      lastUpdatedBy: req.user.name,
      imageUrl: uploadedImage.url,
    });

    res.status(201).json({
      status: "Success",
      message: "Successfully create car",
      data: car,
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await Car.findOne({
      where: {
        id: id,
      },
    });

    if (!car) {
      return res.status(404).json({
        status: "Error",
        message: "Car not found",
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

    if (!deletedBy) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    await Car.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Successfully delete car",
      deletedBy: deletedBy.name,
      lastUpdatedBy: deletedBy.name,
      data: null,
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { model, type, price, isAvailable } = req.body;
    const { id } = req.params;

    const car = await Car.findOne({
      where: {
        id: id,
      },
    });

    if (!car) {
      return res.status(404).json({
        status: "Error",
        message: "Car not found",
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

    if (!updatedBy) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    await Car.update(
      {
        model,
        type,
        price,
        isAvailable,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Successfully update car",
      updatedBy: updatedBy.name,
      lastUpdatedBy: updatedBy.name,
      data: {
        model,
        type,
        price,
        isAvailable,
      },
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAvailableCars,
  getCarById,
  createCar,
  deleteCar,
  updateCar,
};
