const router = require("express").Router();

const System = require("./systemRouter");
const User = require("./userRouter");
const Auth = require("./authRouter");
const Car = require("./carRouter");
const SwaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");
const { systemController } = require("../controllers");

router.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

router.use("/", System);
// router.use("/users", User);
router.use("/auth", Auth);
// router.use("/cars", Car);
router.use(systemController.onLost);

module.exports = router;
