const router = require("express").Router();

const { userController } = require("../controllers");

router.get("/", userController.getAllUsers);

module.exports = router;
