const express = require("express");
const user = express.Router();
const UserModel = require("../models/user.model");
const protectRoute = require("../middleware/protectRoute");
const correctUser = require("../middleware/correctUser");
const bcrypt = require("bcryptjs");
const createJWTToken = require("../config/jwt");
const wishlist = require("./wishlist.route");

user.use(
  // "/:username/wishlist",
  "/wishlist",
  function (req, res, next) {
    // req.username = req.params.username;
    next();
  },
  wishlist
);

user.get("/", (req, res, next) => {
  res.send("Welcome!");
});

user.post("/signup", async (req, res, next) => {
  username = req.body.username;
  password = req.body.password;
  try {
    const user = new UserModel(req.body);
    const newUser = await user.save();

    res.status(201).send(newUser);
  } catch (err) {
    // err.statusCode = 400;
    // err.message = "Invalid username, please try again!";
    next(err);
  }
});

user.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      throw new Error("Login failed");
    }

    const token = createJWTToken(user.username);

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const expiryDate = new Date(Date.now() + oneWeek);

    res.cookie("token", token, {
      expires: expiryDate,
      httpOnly: true, // client-side js cannot access cookie info
      secure: true, // use HTTPS / comment out when testing locally
      sameSite: "none", // comment out when testing locally
    });

    res.send("You are now logged in!");
  } catch (err) {
    if (err.message === "Login failed") {
      err.statusCode = 400;
    }
    next(err);
  }
});

user.post("/logout", protectRoute, (req, res) => {
  res.clearCookie("token").send("You are now logged out!");
});

module.exports = user;
