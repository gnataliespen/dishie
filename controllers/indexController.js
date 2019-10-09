const recipes = require("../db/models/recipeModel");
const users = require("../db/models/userModel");

exports.about = (req, res) => {
  res.send("about");
};

exports.home = async (req, res) => {
  let featured = await recipes.find({ tags: "featured" });
  res.render("index/welcome", { recipes: featured });
};

exports.dash = async (req, res) => {
  let user = await users.findOne({ _id: req.user.id }).populate("myRecipes");
  res.render("index/dash", { recipes: user.myRecipes });
};
