const express = require("express");
const wishlist = express.Router({ mergeParams: true });
const protectRoute = require("../middleware/protectRoute");
const User = require("../models/user.model");
const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");

// wishlist.post("/", [protectRoute, correctUser], async (req, res, next) => {
wishlist.post("/", protectRoute, async (req, res, next) => {
  try {
    let browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    let page = await browser.newPage();

    let pageUrl = req.body.url;

    // -- by using the following:
    // let pageUrl = await Object.values(req.body);
    // let finalPageUrl = pageUrl[0];
    // await page.goto(finalPageUrl);
    // -- we are allowing the user to pass in as many key/values
    // -- when they should only be passing in 1 field
    // -- and it should be specifically "url" key

    await page.goto(pageUrl, {
      waitUntil: "domcontentloaded",
    });

    let itemDetails = await page.evaluate(async () => {
      let productLink = window.location.href;
      let productName = document.querySelector(".product-name").innerText;
      let originalPrice = document.querySelector(".price-standard").innerText;
      let salesPrice = document.querySelector(".price-sales").innerText.trim();
      const date = new Date();
      const lastUpdated = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      return {
        productLink,
        productName,
        originalPrice,
        salesPrice,
        lastUpdated,
      };
    });

    await browser.close();
    await User.updateOne(
      { username: req.user.username },
      {
        $addToSet: {
          wishlist: itemDetails,
        },
      }
    );
    res.status(201).json(itemDetails);
  } catch (err) {
    next(err);
  }
});

// wishlist.delete("/:id", [protectRoute, correctUser], async (req, res, next) => {
wishlist.delete("/:id", protectRoute, async (req, res, next) => {
  try {
    const wishlist = await User.updateOne(
      { username: req.user.username, "wishlist._id": req.params.id },
      {
        $pull: {
          wishlist: { _id: req.params.id },
        },
      }
    );
    if (wishlist === null) {
      const error = new Error("Item does not exist");
      error.statusCode = 400;
      next(error);
    } else {
      res.status(200).json(wishlist);
    }
  } catch (error) {
    next(error);
  }
});

// wishlist.get("/", [protectRoute, correctUser], async (req, res, next) => {
wishlist.get("/", protectRoute, async (req, res, next) => {
  let aggregateArray = [
    {
      $match: {
        // username: req.username,
        username: req.user.username,
      },
    },
    {
      $unwind: "$wishlist",
    },
    {
      $project: {
        _id: "$wishlist._id",
        productLink: "$wishlist.productLink",
        productName: "$wishlist.productName",
        originalPrice: "$wishlist.originalPrice",
        salesPrice: "$wishlist.salesPrice",
        lastUpdated: "$wishlist.lastUpdated",
      },
    },
  ];

  try {
    const wishlistItems = await User.aggregate(aggregateArray);
    results = [];
    for (let i = 0; i < wishlistItems.length; i++) {
      let SCRAPING_URL = wishlistItems[i].productLink;

      const response = await axios
        .get(SCRAPING_URL)
        .then((res) => res.data)
        .catch((err) => console.log(err));

      const $ = cheerio.load(response);

      const date = new Date();
      const lastUpdated = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      let productLink = SCRAPING_URL;
      let productName = $(".product-name").text();
      if ($(".price-standard").text().trim() === "") {
        let originalPrice = $(".price-sales").text().trim();
        let salesPrice = "N/A";
        results.push({
          productLink: productLink,
          productName: productName,
          originalPrice: originalPrice,
          salesPrice: salesPrice,
          lastUpdated: lastUpdated,
        });
      } else {
        let originalPrice = $(".price-standard").text().trim();
        let salesPrice = $(".price-sales").text().trim();
        results.push({
          productLink: productLink,
          productName: productName,
          originalPrice: originalPrice,
          salesPrice: salesPrice,
          lastUpdated: lastUpdated,
        });
      }
    }

    await User.updateOne(
      { username: req.user.username },
      {
        $set: {
          wishlist: results,
        },
      }
    );

    const updatedWishlist = await User.aggregate(aggregateArray);
    res.status(200).json(updatedWishlist);
  } catch (err) {
    next(err);
  }
});

module.exports = wishlist;
