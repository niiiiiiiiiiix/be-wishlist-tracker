const express = require("express");
const user = express.Router();
const User = require("../models/user.model");
const protectRoute = require("../middleware/protectRoute");
const bcrypt = require("bcryptjs");
const createJWTToken = require("../config/jwt");

user.post("/signup", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    err.statusCode = 400;
    err.message = "Invalid username, please try again!";
    next(err);
  }
});

user.get("/:username", protectRoute, async (req, res, next) => {
  try {
    const username = req.params.username;
    const regex = new RegExp(username, "gi");
    const users = await User.find({ username: regex });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

user.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
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
      secure: true, // use HTTPS
    });

    res.send("You are now logged in!");
  } catch (err) {
    if (err.message === "Login failed") {
      err.statusCode = 400;
    }
    next(err);
  }
});

user.post("/logout", (req, res) => {
  res.clearCookie("token").send("You are now logged out!");
});

// const wishlist = require("./wishlist.route")

// user.use("/:username")

module.exports = user;
