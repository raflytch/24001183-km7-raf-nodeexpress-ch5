require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT;
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", router);
// app.use("/api-docs");
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
