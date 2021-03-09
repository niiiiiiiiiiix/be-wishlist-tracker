const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/wishlist.controller");
const jsonContent = require("../middleware/requireJSONcontent");
const moment = require("moment");
const Wishlist = require("../models/wishlist.model");

const puppeteer = require("puppeteer");

router.post("/", async (req, res, next) => {
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

    await page.goto(pageUrl);

    await page.exposeFunction("moment", () =>
      moment().format("DD MMM YYYY, h:mm A")
    );

    let itemDetails = await page.evaluate(async () => {
      let productLink = window.location.href;
      let productName = document.querySelector(".product-name").innerText;
      let originalPrice = document.querySelector(".price-standard").innerText;
      let salesPrice = document.querySelector(".price-sales").innerText.trim();
      let lastUpdated = await window.moment();

      return {
        productLink,
        productName,
        originalPrice,
        salesPrice,
        lastUpdated,
      };
    });

    await browser.close();
    const wishlistItem = await ctrl.createNewWishlistItem(itemDetails, next);
    res.status(201).json(wishlistItem);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const wishlistItems = await ctrl.getAllWishlistItems(next);

    for (let i = 0; i < wishlistItems.length; i++) {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      let pageUrl = wishlistItems[i].productLink;
      await page.goto(pageUrl);

      await page.exposeFunction("moment", () =>
        moment().format("DD MMM YYYY, h:mm A")
      );

      let revisedItemDetails = await page.evaluate(async () => {
        let salesPrice = document
          .querySelector(".price-sales")
          .innerText.trim();
        let lastUpdated = await window.moment();

        return {
          salesPrice,
          lastUpdated,
        };
      });

      await Wishlist.updateOne(
        { _id: wishlistItems[i]._id },
        {
          $set: { salesPrice: revisedItemDetails.salesPrice },
          $set: { lastUpdated: revisedItemDetails.lastUpdated },
        }
      );
      await browser.close();
    }
    res.status(200).json(wishlistItems);
  } catch (err) {
    next(err);
  }
});

// router.get("/", async (req, res, next) => {
//   const wishlistItems = await ctrl.getAllWishlistItems(next);
//   res.status(200).json(wishlistItems);
//   // console.log(wishlistItems.length);
//   // console.log(wishlistItems[0]);
//   // let a = wishlistItems[0];
//   // console.log(a);
//   // console.log(a.productLink);
//   // res.json(a.productLink);
// });

module.exports = router;
