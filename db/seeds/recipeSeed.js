const recipes = require("../models/recipeModel");
const seedData = require("./rseed.json");
const ingredients = require("../models/ingredientModel");

const formatter = async recArr => {
  let recArrProper = [];
  let i = 0;
  for (let recipe of recArr) {
    let recProper = { ingredients: [], instructions: [] };
    recProper.yield = recipe.yieldPrepCookTot[0].name;
    recProper.prepTime = recipe.yieldPrepCookTot[1].name;
    recProper.cookTime = recipe.yieldPrepCookTot[2].name;
    recProper.total = recipe.yieldPrepCookTot[3].name;
    for (let ingredientObj of recipe.ingredients) {
      let ingProper = await ingredients.findOne({
        raw: ingredientObj.ingredient,
      });
      recProper.ingredients.push(ingProper);
    }

    for (let stepObj of recipe.instructions) {
      recProper.instructions.push(stepObj.step);
    }
    recProper.title = recipe.title;
    recProper.img = recipe.img;
    recProper.description = recipe.description;
    recArrProper.push(recProper);
  }
  recSeeder(recArrProper);
};

const recSeeder = async rec => {
  errs = [];
  try {
    await recipes.deleteMany();
    for (let single of rec) {
      for (let ingred of single.ingredients) {
        if (ingred === null) {
          errs.push(single);
        }
      }
      if (!errs.includes(single)) {
        await recipes.create(single);
      }
    }
    console.log("---------------------");
    console.log(errs);
  } catch (err) {
    console.log(err);
  }
};

formatter(seedData.recipes);

/*
const test = async () => {
  try {
    let r = await recipes.find();
    for (let s of r) {
      await recipes
        .findOne({ _id: s.id })
        .populate("ingredients")
        .exec((err, rec) => {
          console.log(console.log(rec));
        })
        .save();
    }
  } catch (e) {
    console.log(e);
  }
};
test();
*/
