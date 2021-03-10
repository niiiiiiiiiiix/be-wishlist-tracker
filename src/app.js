require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const userRouter = require("./routes/user.route");
app.use("/", userRouter);

const wishlistRouter = require("./routes/wishlist.route");
app.use("/wishlist", wishlistRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
