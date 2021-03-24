const axios = require("axios");
const cheerio = require("cheerio");

const SCRAPING_URL =
  "https://cottonon.com/SG/the-weekend-pant/2010880-02.html?dwvar_2010880-02_color=2010880-02&cgid=sale&originalPid=2010880-02#start=2";

(async () => {
  const date = new Date();
  const lastUpdated = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const response = await axios
    .get(SCRAPING_URL)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  const results = [];

  if (response) {
    const $ = cheerio.load(response);

    results.push({
      productLink: SCRAPING_URL,
      productName: $(".product-name").text(),
      originalPrice: $(".price-standard").text().trim(),
      salesPrice: $(".price-sales").text().trim(),
      lastUpdated: lastUpdated,
    });
    // results.push({ productLink: SCRAPING_URL });
    // results.push({ productName: $(".product-name").text() });
    // results.push({ originalPrice: $(".price-standard").text().trim() });
    // results.push({ salesPrice: $(".price-sales").text().trim() });
    // results.push({ lastUpdated: lastUpdated });
  }

  console.log(results);
})();
