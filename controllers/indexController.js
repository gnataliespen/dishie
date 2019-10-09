const recipes = require("../db/models/recipeModel");
const users = require("../db/models/userModel");

//About route handler
exports.about = (req, res) => {
  res.render("index/about");
};

//Welcome handler
exports.home = async (req, res) => {
  let featured = await recipes.find({ tags: "featured" });
  res.render("index/welcome", { recipes: featured });
};

//Dashboard handler
exports.dash = async (req, res) => {
  let user = await users.findOne({ _id: req.user.id }).populate("myRecipes");
  let userPosts = await recipes
    .find({ author: req.user.id })
    .populate("ingredients");
  res.render("index/dash", { myRecipes: user.myRecipes, posts: userPosts });
};
