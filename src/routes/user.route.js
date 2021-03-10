const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
// const protectRoute = require("../middleware/protectRoute");
// const bcrypt = require("bcryptjs");
// const createJWTToken = require("../config/jwt");

router.post("/", async (req, res, next) => {
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

module.exports = router;
