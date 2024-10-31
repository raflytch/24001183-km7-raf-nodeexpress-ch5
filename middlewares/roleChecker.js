const roleChecker = (roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: "Error",
          message: "Unauthorized access because of missing token",
          data: null,
          isError: true,
          isSuccess: false,
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          status: "Error",
          message: "Unauthorized access because of invalid role",
          data: null,
          isError: true,
          isSuccess: false,
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = roleChecker;
