const recipes = require("../db/models/recipeModel");

exports.about = (req, res) => {
  res.send("about");
};

exports.home = async (req, res) => {
  let featured = await recipes.find({ tags: "featured" });
  res.render("index", { recipes: featured });
};
