const express = require("express");
const wishlist = express.Router();
const ctrl = require("../controllers/wishlist.controller");
// const jsonContent = require("../middleware/requireJSONcontent");
const protectRoute = require("../middleware/protectRoute");
const User = require("../models/user.model");

const puppeteer = require("puppeteer");

wishlist.post("/", protectRoute, async (req, res, next) => {
  try {
    let browser = await puppeteer.launch();
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
      { username: req.username },
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

wishlist.delete("/:id", async (req, res, next) => {
  try {
    const wishlist = await User.updateOne(
      { username: req.username, "wishlist._id": req.params.id },
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

wishlist.get("/", protectRoute, async (req, res, next) => {
  let aggregateArray = [
    {
      $match: {
        username: req.username,
      },
    },
    {
      $unwind: "$wishlist",
    },
    {
      $match: {
        username: req.username,
      },
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

    testArray = [];
    for (let i = 0; i < wishlistItems.length; i++) {
      let browser = await puppeteer.launch({ headless: true });
      let page = await browser.newPage();
      let pageUrl = wishlistItems[i].productLink;

      await page.setRequestInterception(true);

      page.on("request", (req) => {
        if (
          req.resourceType() == "stylesheet" ||
          req.resourceType() == "font" ||
          req.resourceType() == "media" ||
          req.resourceType() == "image"
        ) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto(pageUrl, {
        waitUntil: "domcontentloaded",
      });

      let revisedItemDetails = await page.evaluate(async () => {
        let productLink = window.location.href;
        let productName = document.querySelector(".product-name").innerText;
        let originalPrice = document.querySelector(".price-standard").innerText;
        let salesPrice = document
          .querySelector(".price-sales")
          .innerText.trim();
        let date = new Date();
        let lastUpdated = date.toLocaleString("en-GB", {
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

      await testArray.push(revisedItemDetails);
      await page.close();
      await browser.close();
    }

    await User.updateOne(
      { username: req.username },
      {
        $set: {
          wishlist: testArray,
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
