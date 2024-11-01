const router = require("express").Router();
const { carController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");
const roleChecker = require("../middlewares/roleChecker");
const upload = require("../middlewares/uploader");

router.get("/", authenticate, carController.getAllCars);
router.get("/:id", authenticate, carController.getCarById);
router.post(
  "/",
  authenticate,
  roleChecker(["Superadmin", "Admin"]),
  upload.single("image"),
  carController.createCar
);

router.delete(
  "/:id",
  authenticate,
  roleChecker(["Superadmin", "Admin"]),
  carController.deleteCar
);

router.patch(
  "/:id",
  authenticate,
  roleChecker(["Superadmin", "Admin"]),
  upload.single("image"),
  carController.updateCar
);

module.exports = router;
