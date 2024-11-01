const router = require("express").Router();
const { authController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");
const roleChecker = require("../middlewares/roleChecker");

router.post("/register", authController.register);

// Login Global
router.post("/login", authController.login);

router.post(
  "/create-admin",
  authenticate,
  roleChecker(["Superadmin"]),
  authController.createAdmin
);

router.get("/token", authenticate, authController.tokenChecker);

module.exports = router;
