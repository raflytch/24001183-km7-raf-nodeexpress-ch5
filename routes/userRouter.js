const router = require("express").Router();

const { userController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");
const roleChecker = require("../middlewares/roleChecker");

router.get(
  "/",
  authenticate,
  roleChecker(["Superadmin", "Admin"]),
  userController.getAllUsers
);

router.get(
  "/:id",
  authenticate,
  roleChecker(["Superadmin", "Admin"]),
  userController.getUserById
);

router.post(
  "/",
  authenticate,
  roleChecker(["Superadmin"]),
  userController.createUserAdmin
);

router.patch(
  "/:id",
  authenticate,
  roleChecker(["Superadmin"]),
  userController.updateUser
);

router.delete(
  "/:id",
  authenticate,
  roleChecker(["Superadmin", "Admin"]),
  userController.deleteUser
);

module.exports = router;
