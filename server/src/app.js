require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

let corsOptions = {
  // origin: process.env.PORT || "http://localhost:3000",
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
};
const cors = require("cors");
app.use(cors(corsOptions));

const userRouter = require("./routes/user.route");
app.use("/user", userRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
