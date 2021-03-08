const express = require("express");
const app = express();
app.use(express.json());

const win = {
  0: "GET    /",
  1: "GET    /dumplings",
  2: "POST   /dumplings",
  3: "GET    /dumplings/:name",
  4: "PUT    /dumplings/:id",
  5: "DELETE /dumplings/:id",
  6: "-----------------------",
  7: "GET    /dumplings/presenter",
};
app.get("/", (req, res) => {
  res.status(200).json(win);
});

const wishlistRouter = require("./routes/wishlist.route");
app.use("/wishlist", wishlistRouter);

const scrapeRouter = require("./routes/scrape.route");
app.use("/scrape", scrapeRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
