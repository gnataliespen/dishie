const ingredients = require("../models/ingredientModel");
const seedData = require("./rseed.json");
const fetch = require("node-fetch");

//Make a list of all ingredients in db
const mkList = () => {
  console.log("entering mklist");
  let list = [];
  for (let recipe of seedData.recipes) {
    for (let ing of recipe.ingredients) {
      list.push(ing.ingredient);
    }
  }
  console.log("exiting mklist");
  return list;
};
//Divide them up into groups of 100 and call apiReq
const ingListSplitter = async () => {
  console.log("entering ingListSplitter");
  let ingListRaw = await mkList();
  let ingListProper = [];
  while (ingListRaw.length > 0) {
    let smolListRaw = ingListRaw.splice(0, 100);
    let smolListProper = await apiReq(smolListRaw);
    ingListProper.push(smolListProper);
  }
  console.log("exiting inglistsplitter");
  ingListProper = ingListProper.flat();
  for (ing of ingListProper) {
    if (!ing.unit) {
      ing.unit = ing.product;
    }
  }
  return ingListProper;
};
//Sends ingredients to zestful api for formatting, the api only accpets 100 ingredients at a time
const apiReq = async ingArr => {
  console.log("entering apiReq");
  let ingDataProper = [];
  try {
    let response = await fetch(
      "https://zestful.p.rapidapi.com/parseIngredients",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "zestful.p.rapidapi.com",
          "x-rapidapi-key":
            "28e31d6f4amsh1bb6e0e85658709p1f02aejsndb69715df850",
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          ingredients: ingArr,
        }),
      },
    );

    ingDataProper = ingListFormatter(response);
    console.log("exiting apireq");
    return ingDataProper;
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
};

const ingListFormatter = async ingDataRaw => {
  console.log("processing data");
  let formatted = [];
  try {
    let ingDataJson = await ingDataRaw.json();
    for (let ingObj of ingDataJson.results) {
      ingObj.ingredientParsed.raw = ingObj.ingredientRaw;
      formatted.push(ingObj.ingredientParsed);
    }
    console.log("exiting formatter");
    return formatted;
  } catch (err) {
    console.log(err);
  }
};

//Finally we seed the db w/ our formatted data
const ingSeeder = async () => {
  console.log("time 2 seed");
  let results = await ingListSplitter();
  let errs = [];
  try {
    await ingredients.deleteMany();
    for (let ing of results) {
      let existing = await ingredients.find({ raw: ing.raw });
      if (existing.length === 0) {
        await ingredients.create(ing);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
ingSeeder();
