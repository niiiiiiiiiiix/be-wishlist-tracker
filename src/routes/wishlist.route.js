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

    await page.exposeFunction("moment", () =>
      moment().format("DD MMM YYYY, h:mm A")
    );

    await page.goto(pageUrl, {
      waitUntil: "domcontentloaded",
    });

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
    let browser = await puppeteer.launch({ headless: true });
    for (let i = 0; i < wishlistItems.length; i++) {
      let page = await browser.newPage();
      let pageUrl = wishlistItems[i].productLink;
      page.exposeFunction("moment", () =>
        moment().format("DD MMM YYYY, h:mm:ss A")
      );

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
      await page.close();
    }
    await browser.close();
    res.status(200).json(wishlistItems);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
