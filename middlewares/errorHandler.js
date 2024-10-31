const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    status: "Error",
    message: err.message || "Internal Server Error",
    data: null,
    isError: true,
    isSuccess: false,
  });
};

module.exports = errorHandler;
