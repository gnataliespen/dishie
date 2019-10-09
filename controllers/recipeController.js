const recipes = require("../db/models/recipeModel");
const inputHelpers = require("../helpers/input");
const users = require("../db/models/userModel");

// /recipes route handler
exports.allRecipes = async (req, res) => {
  let allRec = await recipes.find();
  res.render("recipeViews/all", { recipes: allRec });
};

//Show single recipe handler
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

//New Recipe form route handler
exports.newRecipePage = (req, res) => {
  res.render("recipeViews/new");
};

//New Recipe POST handler
exports.newRecipePost = async (req, res) => {
  try {
    //Sends ingredients off for formatting
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

//Edit page route handler
exports.editRecipePage = async (req, res) => {
  let recipe = await recipes
    .findOne({ _id: req.params.id })
    .populate("ingredients");
  //only author can edit
  if (recipe.author == req.user.id) {
    res.render("recipeViews/edit", { recipe: recipe });
  } else {
    res.redirect("/");
  }
};

//PUT handler
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

//Delete route handler
exports.deleteRecipe = async (req, res) => {
  //if theyre the author delete the recipe
  if (req.params.id == req.user.id) {
    recipes
      .findOneAndRemove({ _id: req.params.id }, { useFindAndModify: false })
      .then(() => {
        res.redirect("/");
      });
  } else {
    //Otherwise just remove it from there saved recipes
    let user = await users.findOne({ _id: req.user.id });
    await user.myRecipes.pull(req.params.id);
    await user.save();
    res.redirect("/");
  }
};
//Comment POST handler
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

//Add to my recipes route handler
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

//Search handler
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
