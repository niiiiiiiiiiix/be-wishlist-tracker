const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://cottonon.com/SG/cindy-wide-leg-pant/2009158-23.html"
  );

  const productName = await page.$(".product-name");
  const itemName = await page.evaluate(
    (element) => element.textContent,
    productName
  );
  console.log(itemName);

  const productPriceOriginal = await page.$(".price-standard");
  const itemPriceOriginal = await page.evaluate(
    (element) => element.textContent,
    productPriceOriginal
  );
  console.log("Original price: " + itemPriceOriginal.trim());
  // console.log(itemPriceOriginal.trim().length);

  const productPriceSales = await page.$(".price-sales");
  const itemPriceSales = await page.evaluate(
    (element) => element.textContent,
    productPriceSales
  );
  console.log("Sales price: " + itemPriceSales.trim());

  await browser.close();
})();
