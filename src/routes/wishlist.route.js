const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/wishlist.controller");
const jsonContent = require("../middleware/requireJSONcontent");

router.post("/", jsonContent, async (req, res, next) => {
  const wishlistItem = await ctrl.createNewWishlistItem(req.body, next);
  console.log(wishlistItem);
  res.status(201).json(wishlistItem);
});

router.get("/", async (req, res, next) => {
  const wishlistItems = await ctrl.getAllWishlistItems(next);
  res.status(200).json(wishlistItems);
});

module.exports = router;
