const recipes = require("../db/models/recipeModel");

exports.about = (req, res) => {
  res.send("about");
};

exports.home = async (req, res) => {
  let featured = await recipes.find({ tags: "featured" });
  res.render("index/welcome", { recipes: featured });
};

exports.dash = async (req, res) => {
  res.render("index/dash");
};
