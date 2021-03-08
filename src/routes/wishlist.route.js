const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/wishlist.controller");
const jsonContent = require("../middleware/requireJSONcontent");

const puppeteer = require("puppeteer");

// router.post("/", async (req, res, next) => {
//   const wishlistItem = await ctrl.createNewWishlistItem(req.body, next);
//   console.log(wishlistItem);
//   res.status(201).json(wishlistItem);
// });

router.post("/", async (req, res, next) => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  let pageUrl = await Object.values(req.body);
  let finalPageUrl = pageUrl[0];
  await page.goto(finalPageUrl);

  let data = await page.evaluate(() => {
    let productLink = window.location.href;
    let productName = document.querySelector(".product-name").innerText;
    let originalPrice = document.querySelector(".price-standard").innerText;
    let salesPrice = document.querySelector(".price-sales").innerText.trim();

    return {
      productLink,
      productName,
      originalPrice,
      salesPrice,
    };
  });

  const wishlistItem = await ctrl.createNewWishlistItem(data, next);
  await browser.close();
  res.status(201).json(wishlistItem);
});

router.get("/", async (req, res, next) => {
  const wishlistItems = await ctrl.getAllWishlistItems(next);
  res.status(200).json(wishlistItems);
});

module.exports = router;
