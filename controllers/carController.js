const { Car, User } = require("../db/models");
const imagekit = require("../lib/imagekit");
const { Op } = require("sequelize");

const getAllCars = async (req, res, next) => {
  try {
    const { model, type, price, limit = 10, page = 1 } = req.query;

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
        [Op.iLike]: `%${price}%`,
      };
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
      attributes: ["id", "model", "type", "price", "imageUrl"],
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
        id: req.params.id,
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
    const { model, type, price } = req.body;
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
      },
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const availabeCars = async (req, res, next) => {
  try {
    const { name, model, type, maxPrice, minPrice } = req.query;

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

    const conditions = {};

    if (name) {
      conditions.name = { [Op.iLike]: `%${name}%` };
    }
    if (model) {
      conditions.model = { [Op.iLike]: `%${model}%` };
    }
    if (type) {
      conditions.type = { [Op.iLike]: `%${type}%` };
    }

    if (minPrice && maxPrice) {
      conditions.price = {
        [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)],
      };
    } else if (minPrice) {
      conditions.price = { [Op.gte]: parseFloat(minPrice) };
    } else if (maxPrice) {
      conditions.price = { [Op.lte]: parseFloat(maxPrice) };
    }

    const cars = await Car.findAll({
      where: conditions,
      order: [["createdAt", "DESC"]],
    });

    if (!cars || !cars.length) {
      return res.status(404).json({
        status: "Error",
        message: "No cars found matching the criteria",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully retrieved available cars",
      data: cars,
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  deleteCar,
  updateCar,
  availabeCars,
};
