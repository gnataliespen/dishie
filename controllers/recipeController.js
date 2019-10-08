const recipes = require("../db/models/recipeModel");

exports.allRecipes = async (req, res) => {
  let allRec = await recipes.find();
  res.send(allRec);
};

exports.showRecipe = async (req, res) => {
  let spec = await recipes.find({ _id: req.params.id });
  res.send(spec);
};

exports.newRecipePage = (req, res) => {
  res.render("new");
};

exports.newRecipePost = async (req, res) => {
  try {
    await recipes.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
