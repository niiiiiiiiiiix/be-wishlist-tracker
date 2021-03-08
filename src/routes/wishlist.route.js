const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/wishlist.controller");
const jsonContent = require("../middleware/requireJSONcontent");
const moment = require("moment");

const puppeteer = require("puppeteer");

// router.post("/", async (req, res, next) => {
//   const wishlistItem = await ctrl.createNewWishlistItem(req.body, next);
//   console.log(wishlistItem);
//   res.status(201).json(wishlistItem);
// });
// let test = moment().format("DD MMM YYYY, h:mm A").toUpperCase();
// console.log(test);

router.post("/", async (req, res, next) => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  let pageUrl = await Object.values(req.body);
  let finalPageUrl = pageUrl[0];
  await page.goto(finalPageUrl);
  // let test = await page.exposeFunction("formatDate", () => {
  //   moment().format("DD MMM YYYY, h:mm A").toUpperCase();
  // });
  // console.log(test);
  // await page.exposeFunction("moment", moment);
  await page.exposeFunction("moment", () =>
    moment().format("DD MMM YYYY, h:mm A")
  );

  let itemDetails = await page.evaluate(async () => {
    // let ts = Date.now();
    // let date_ob = new Date(ts);
    // let date = date_ob.getDate();
    // let month = date_ob.getMonth() + 1;
    // let year = date_ob.getFullYear();

    let productLink = window.location.href;
    let productName = document.querySelector(".product-name").innerText;
    let originalPrice = document.querySelector(".price-standard").innerText;
    let salesPrice = document.querySelector(".price-sales").innerText.trim();
    let lastUpdated = await window.moment();
    // let lastUpdated = await window.moment(timestamp).format("DD MMM YYYY");
    // let lastUpdated = moment().format("DD MMM YYYY, h:mm A").toUpperCase();
    // let lastUpdated = Date.now();

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
