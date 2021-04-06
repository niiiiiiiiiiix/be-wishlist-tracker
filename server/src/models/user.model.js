const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // newly added
const { secret } = require("../config/secret"); // newly added

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

// newly added
// creation of the JWT token itself should be in one place only (user model)
// instead of in jwt.js
// where getJWTsecret is extracted into secret.js
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      username: this.username,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
};
// newly added

const User = mongoose.model("User", userSchema);

module.exports = User;
