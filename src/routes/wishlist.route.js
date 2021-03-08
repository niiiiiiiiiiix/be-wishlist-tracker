const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/wishlist.controller");
const jsonContent = require("../middleware/requireJSONcontent");

const puppeteer = require("puppeteer");

const tests = [];

router.post("/", jsonContent, async (req, res, next) => {
  const wishlistItem = await ctrl.createNewWishlistItem(req.body, next);
  console.log(wishlistItem);
  res.status(201).json(wishlistItem);
});

router.get("/", async (req, res, next) => {
  const wishlistItems = await ctrl.getAllWishlistItems(next);
  res.status(200).json(wishlistItems);
});

// router.post("/test", async (req, res, next) => {
//   let itemUrl = req.body.link

//   let browser = await puppeteer.launch();
//   let page = await browser.newPage();

//   await page.goto(itemUrl)

//   let newItem = {
//     itemLink = req.body.link
//     itemName =
//   };
//   tests.push(newItem);

//   res.status(201).json(tests);
// })

module.exports = router;
