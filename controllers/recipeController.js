const recipes = require("../db/models/recipeModel");
const inputHelpers = require("../helpers/input");
const users = require("../db/models/userModel");

exports.allRecipes = async (req, res) => {
  let allRec = await recipes.find();
  res.render("recipeViews/all", { recipes: allRec });
};

exports.showRecipe = async (req, res) => {
  try {
    let recipe = await recipes
      .findOne({ _id: req.params.id })
      .populate("ingredients")
      .populate("author")
      .populate("comments.commentUser");
    res.render("recipeViews/show", { rec: recipe });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

exports.newRecipePage = (req, res) => {
  res.render("recipeViews/new");
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
    await users.findByIdAndUpdate(
      req.user.id,
      {
        $push: { myRecipes: newRecObj },
      },
      { useFindAndModify: false },
    );
  } catch (err) {
    console.log(err);
  }
};

exports.editRecipePage = async (req, res) => {
  let recipe = await recipes
    .findOne({ _id: req.params.id })
    .populate("ingredients");
  if (recipe.author == req.user.id) {
    res.render("recipeViews/edit", { recipe: recipe });
  } else {
    res.redirect("/");
  }
};

exports.editRecipe = async (req, res) => {
  let ingObjArr = await inputHelpers.ingListFormatter(req.body.ingredients);
  let updated = req.body;
  updated.ingredients = ingObjArr;
  recipes
    .findOneAndUpdate({ _id: req.params.id }, updated, {
      new: true,
      useFindAndModify: false,
    })
    .then(recipe => {
      res.redirect(`/recipes/show/${recipe._id}`);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteRecipe = async (req, res) => {
  if (req.params.id == req.user.id) {
    recipes
      .findOneAndRemove({ _id: req.params.id }, { useFindAndModify: false })
      .then(() => {
        res.redirect("/");
      });
  } else {
    let user = await users.findOne({ _id: req.user.id });
    await user.myRecipes.pull(req.params.id);
    await user.save();
    res.redirect("/");
  }
};
exports.comment = async (req, res) => {
  let recipe = await recipes.findOne({ _id: req.params.id });
  let newComment = {
    commentBody: req.body.commentBody,
    commentUser: req.user.id,
  };
  await recipes.findByIdAndUpdate(
    recipe.id,
    {
      $push: { comments: newComment },
    },
    { useFindAndModify: false },
  );
  res.redirect(`/recipes/show/${recipe.id}`);
};

exports.saveRecipe = async (req, res) => {
  let recipe = await recipes.findOne({ _id: req.params.id });
  await users.findByIdAndUpdate(
    req.user.id,
    {
      $push: { myRecipes: recipe },
    },
    { useFindAndModify: false },
  );
  res.redirect("/");
};

exports.search = (req, res) => {
  recipes
    .find({ $text: { $search: req.body.query } })
    .then(recipe => {
      res.render("recipeViews/all", { recipes: recipe });
    })
    .catch(err => {
      console.log(err);
    });
};
