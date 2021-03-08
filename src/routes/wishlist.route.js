const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/wishlist.controller");
const jsonContent = require("../middleware/requireJSONcontent");
const moment = require("moment");

const puppeteer = require("puppeteer");

router.post("/", async (req, res, next) => {
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

  const wishlistItem = await ctrl.createNewWishlistItem(itemDetails, next);
  await browser.close();
  res.status(201).json(wishlistItem);
});

router.get("/", async (req, res, next) => {
  const wishlistItems = await ctrl.getAllWishlistItems(next);
  res.status(200).json(wishlistItems);
});

module.exports = router;
