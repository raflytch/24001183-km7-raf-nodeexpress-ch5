const { Auth, User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { username, email, password, address, age } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: "Error",
        message: "Username and password are required",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const user = await Auth.findOne({ where: { email } });
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

    const newUser = await User.create({
      name: username,
      address,
      age,
      role: "Member",
    });

    const newAuth = await Auth.create({
      email,
      password: hashedPassword,
      userId: newUser.id,
    });

    return res.status(201).json({
      status: "Success",
      message: "User created successfully",
      data: {
        newUser,
        id: newAuth.id,
        email: newAuth.email,
        password: newAuth.password,
        userId: newAuth.userId,
      },
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "Error",
        message: "Email and password are required",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const auth = await Auth.findOne({
      where: { email },
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "name", "role"],
        },
      ],
    });

    if (!auth) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, auth.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid email or password",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    const token = jwt.sign(
      {
        id: auth.userId,
        email: auth.email,
        role: auth.User.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRED,
      }
    );

    return res.status(200).json({
      status: "Success",
      message: "User logged in successfully",
      data: {
        id: auth.id,
        email: auth.email,
        userId: auth.userId,
        role: auth.User.role,
        token,
      },
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const tokenChecker = (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
        data: null,
        isError: true,
        isSuccess: false,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Token verified successfully",
      data: user,
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  tokenChecker,
};
