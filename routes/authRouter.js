const router = require("express").Router();
const { authController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");

router.post("/register", authController.register);

// Login Global
router.post("/login", authController.login);

// Check Token
router.get("/token", authenticate, authController.tokenChecker);

module.exports = router;
