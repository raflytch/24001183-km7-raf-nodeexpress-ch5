const { User, Auth } = require("../db/models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        status: "Error",
        message: "Unauthorized access because of missing token",
        data: [
          {
            token: null,
            data: null,
          },
        ],
        isError: true,
        isSuccess: false,
      });
    }

    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        status: "Error",
        message: "Unauthorized access because of missing token",
        data: [
          {
            token: null,
            data: null,
          },
        ],
        isError: true,
        isSuccess: false,
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      return res.status(401).json({
        status: "Error",
        message: "Unauthorized access because of invalid token",
        data: [
          {
            token: null,
            data: null,
          },
        ],
        isError: true,
        isSuccess: false,
      });
    }

    const user = await User.findOne({
      where: {
        id: payload.id,
      },
      include: [
        {
          model: Auth,
          as: "Auth",
          attributes: ["email"],
        },
      ],
      attributes: ["id", "name", "role"],
    });

    req.user = user;
    req.payload = payload;

    next();
  } catch (error) {
    next(error);
  }
};
