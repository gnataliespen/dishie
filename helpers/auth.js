let recipes = require("../db/models/recipeModel.js");

exports.ensureAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};
exports.ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    return next();
  }
};
