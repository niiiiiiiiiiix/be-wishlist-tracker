function getJWTSecret() {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("Missing secrets to sign JWT token");
  }
  return secret;
}

module.exports = {
  secret: getJWTSecret(),
};

// newly added
// extracted from jwt.js
// createJWTToken moved to user.model.js
