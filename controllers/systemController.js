const healthCheck = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Application passed health check",
      data: null,
      isError: false,
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};

const onLost = (req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: "API Resource not found",
    data: null,
    isError: true,
    isSuccess: false,
  });

  next();
};

module.exports = { healthCheck, onLost };
