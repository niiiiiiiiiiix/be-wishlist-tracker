module.exports = function (req, res, next) {
  // console.log(req.user.username);
  // console.log(req.params.username); // vs req.username
  // console.log(req.username);
  // if (req.user.username !== req.params.username) // if want to use this, then must use "const wishlist = express.Router({ mergeParams: true });" in wishlist.route.js
  if (req.user.username !== req.username)
    return res.status(403).send("Access denied.");

  next();
};
