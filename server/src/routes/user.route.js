const express = require("express");
const user = express.Router();
const UserModel = require("../models/user.model");
const protectRoute = require("../middleware/protectRoute");
const correctUser = require("../middleware/correctUser");
const bcrypt = require("bcryptjs");
const createJWTToken = require("../config/jwt");
const wishlist = require("./wishlist.route");

user.use(
  "/:username/wishlist",
  function (req, res, next) {
    req.username = req.params.username;
    next();
  },
  wishlist
);

user.get("/test", async (req, res, next) => {
  res.send([
    {
      _id: "605054cc6feb79894a3e379e",
      productLink:
        "https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20",
      productName: "The One Scoop Tee",
      originalPrice: "$19.99 ",
      salesPrice: "$10.00",
      lastUpdated: "16 Mar 2021, 14:48:32",
    },
    {
      _id: "605054cc6feb79894a3e379f",
      productLink:
        "https://cottonon.com/SG/the-turn-back-long-sleeve-top/2009325-04.html?dwvar_2009325-04_color=2009325-04&cgid=sale&originalPid=2009325-04#start=1",
      productName: "The Turn Back Long Sleeve Top",
      originalPrice: "$19.99 ",
      salesPrice: "$10.00",
      lastUpdated: "16 Mar 2021, 14:48:35",
    },
    {
      _id: "605054cc6feb79894a3e37a0",
      productLink:
        "https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20",
      productName: "The One Scoop Tee",
      originalPrice: "$19.99 ",
      salesPrice: "$10.00",
      lastUpdated: "16 Mar 2021, 14:48:37",
    },
    {
      _id: "605054cc6feb79894a3e37a1",
      productLink:
        "https://cottonon.com/SG/frankie-lettuce-hem-cami/2051657-01.html?dwvar_2051657-01_color=2051657-01&cgid=sale&originalPid=2051657-01#start=20",
      productName: "Frankie Lettuce Hem Cami",
      originalPrice: "$19.99 ",
      salesPrice: "$10.00",
      lastUpdated: "16 Mar 2021, 14:48:42",
    },
    {
      _id: "605054cc6feb79894a3e37a2",
      productLink:
        "https://cottonon.com/SG/brianna-ruched-front-mini-dress/2051197-12.html?dwvar_2051197-12_color=2051197-12&cgid=sale&originalPid=2051197-12",
      productName: "Brianna Ruched Front Mini Dress",
      originalPrice: "$29.99 ",
      salesPrice: "$15.00",
      lastUpdated: "16 Mar 2021, 14:48:44",
    },
  ]);
});

user.post("/signup", async (req, res, next) => {
  try {
    const user = new UserModel(req.body);
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    err.statusCode = 400;
    err.message = "Invalid username, please try again!";
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

user.post("/logout", [protectRoute, correctUser], (req, res) => {
  res.clearCookie("token").send("You are now logged out!");
});

module.exports = user;
