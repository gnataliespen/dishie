let recipes = require("../db/models/recipeModel.js");

// / routes guests to welcome and users to dashboard
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
