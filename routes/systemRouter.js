const router = require("express").Router();
const { systemController } = require("../controllers");

router.get("/health-check", systemController.healthCheck);

module.exports = router;
