const recipes = require("../db/models/recipeModel");
const inputHelpers = require("../helpers/input");

exports.allRecipes = async (req, res) => {
  let allRec = await recipes.find();
  res.render("recipeViews/all", { recipes: allRec });
};

exports.showRecipe = async (req, res) => {
  try {
    let recipe = await recipes
      .find({ _id: req.params.id })
      .populate("ingredients")
      .populate("author");
    res.render("recipeViews/show", { rec: recipe });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

exports.newRecipePage = (req, res) => {
  res.render("recipeViews/new", { instructions: ["hi"] });
};

exports.newRecipePost = async (req, res) => {
  try {
    let ingObjArr = await inputHelpers.ingListFormatter(req.body.ingredients);
    const newRecipe = {
      title: req.body.title,
      description: req.body.description,
      img: req.body.img,
      ingredients: ingObjArr,
      instructions: req.body.instructions,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      total: req.body.totalTime,
      yield: req.body.yield,
      author: req.user,
    };
    let newRecObj = await recipes.create(newRecipe);
    res.redirect(`/recipes/show/${newRecObj._id}`);
  } catch (err) {
    console.log(err);
  }
};
