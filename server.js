require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const docsRouter = require("./routes/documentationRouter");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", router);
app.use(docsRouter);
app.use(errorHandler);

module.exports = app;
