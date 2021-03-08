const express = require("express");
const router = express.Router();

const puppeteer = require("puppeteer");

const tests = [];

router.get("/", async (req, res, next) => {
  res.status(200).json(tests);
});

router.post("/", async (req, res, next) => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  let pageUrl = await Object.values(req.body);
  let finalPageUrl = pageUrl[0];
  // console.log(pageUrl[0]);
  // console.log("https://cottonon.com/SG/cindy-wide-leg-pant/2009158-23.html");
  // console.log(Object.values(req.body));
  await page.goto(finalPageUrl);

  let data = await page.evaluate(() => {
    let productName = document.querySelector(".product-name").innerText;
    let originalPrice = document.querySelector(".price-standard").innerText;
    let salesPrice = document.querySelector(".price-sales").innerText.trim();

    return {
      productName,
      originalPrice,
      salesPrice,
    };
  });

  // const productName = await page.$(".product-name");
  // const itemName = await page.evaluate(
  //   (element) => element.textContent,
  //   productName
  // );
  // console.log(itemName);

  // let newItem = {
  //   itemName: itemName,
  // };
  tests.push(data);
  console.log(data);
  await browser.close();
  res.status(201).json(tests);
});

module.exports = router;
