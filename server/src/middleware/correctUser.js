module.exports = function (req, res, next) {
  if (req.user.username !== req.params.username)
    return res.status(403).send("Access denied.");
  next();
};
