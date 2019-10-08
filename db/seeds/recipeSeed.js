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
  try {
    await recipes.deleteMany();
    await recipes.create(rec);
    console.log("suceess");
  } catch (err) {
    console.log(err);
  }
};

formatter(seedData.recipes);
