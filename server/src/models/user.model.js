const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const wishlistSchema = new mongoose.Schema({
  productLink: {
    type: String,
    required: true,
    // unique: true,
    // sparse: true,
  },
  productName: {
    type: String,
    required: true,
    // unique: true,
    // sparse: true,
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
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    lowercase: true,
    match: /^[a-zA-Z0-9]*$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  wishlist: [wishlistSchema],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const rounds = 10;
    this.password = await bcrypt.hash(this.password, rounds);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
