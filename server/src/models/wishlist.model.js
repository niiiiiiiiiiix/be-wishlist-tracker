const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = new Schema(
  {
    productLink: {
      type: String,
      required: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    originalPrice: {
      type: String,
      required: true,
    },
    salesPrice: {
      type: String,
      required: false,
    },
    lastUpdated: {
      type: String,
      required: true,
    },
  },
  {
    collation: { locale: "en", strength: 2 },
  }
);

const wishlistModel = mongoose.model("Wishlist", wishlistSchema);
module.exports = wishlistModel;
