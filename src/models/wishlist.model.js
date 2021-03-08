const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
      unique: true,
    },
    priceOld: {
      type: Number,
      required: false,
    },
    priceNew: {
      type: Number,
      required: false,
    },
  },
  {
    collation: { locale: "en", strength: 2 },
  }
);

const wishlistModel = mongoose.model("Wishlist", wishlistSchema);
module.exports = wishlistModel;
