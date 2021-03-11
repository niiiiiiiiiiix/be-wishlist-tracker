const express = require("express");
const wishlist = express.Router();
const ctrl = require("../controllers/wishlist.controller");
// const jsonContent = require("../middleware/requireJSONcontent");
const Wishlist = require("../models/wishlist.model");
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
    // console.log(itemDetails);
    // console.log(req.username);
    await User.updateOne(
      { username: req.username },
      {
        $addToSet: {
          wishlist: itemDetails,
        },
      }
    );

    // const wishlistItem = await ctrl.createNewWishlistItem(itemDetails, next);
    res.status(201).json(itemDetails);
  } catch (err) {
    next(err);
  }
});

wishlist.delete("/:id", async (req, res, next) => {
  try {
    // const wishlist = await ctrl.deleteById(req.params.id, next);
    console.log(req.params.id);
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
  try {
    const wishlistItems = await ctrl.getAllWishlistItems(next);
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
          salesPrice,
          lastUpdated,
        };
      });
      // console.log(revisedItemDetails.salesPrice);

      await Wishlist.updateOne(
        { _id: wishlistItems[i]._id },
        {
          $set: {
            salesPrice: revisedItemDetails.salesPrice,
            lastUpdated: revisedItemDetails.lastUpdated,
          },
        }
      );

      await page.close();
      await browser.close();
    }

    const updatedWishlist = await ctrl.getAllWishlistItems(next);
    res.status(200).json(updatedWishlist);

    let date = new Date();
    let test = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    console.log(test);
    res.status(200);
  } catch (err) {
    next(err);
  }
});

module.exports = wishlist;
