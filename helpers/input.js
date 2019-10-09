const fetch = require("node-fetch");
const ingredients = require("../db/models/ingredientModel.js");

exports.ingListFormatter = async ingListRaw => {
  let ingListProper = [];
  //Splits up data for api calls (Zestful only accpets 100 ingredients at a time)
  while (ingListRaw.length > 0) {
    let smolListRaw = ingListRaw.splice(0, 100);
    let smolListProper = await apiReq(smolListRaw);
    ingListProper.push(smolListProper);
  }
  ingListProper = ingListProper.flat(Infinity);

  return ingListProper;
};
//Sends ingredients to zestful api for formatting
const apiReq = async ingArr => {
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
    //Response needs to be formatted further
    ingDataProper = await resFormatter(response);
    return ingDataProper;
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
};

const resFormatter = async ingDataRaw => {
  let formatted = [];
  try {
    let ingDataJson = await ingDataRaw.json();
    //Adding a str of the ingredient to the obj
    for (let ingObj of ingDataJson.results) {
      ingObj.ingredientParsed.raw = ingObj.ingredientRaw;
      formatted.push(ingObj.ingredientParsed);
    }
    //Handles common zestful problem
    for (let ing of formatted) {
      if (!ing.unit) {
        ing.unit = ing.product;
      }
    }

    let final = await dbAdder(formatted);
    return final;
  } catch (err) {
    console.log(err);
  }
};

//adds our properly formatted ingredients to the ingredient db
const dbAdder = async ingList => {
  let ingListPure = [];
  for (let ing of ingList) {
    let existing = await ingredients.find({ raw: ing.raw });
    if (existing.length > 0) {
      ingListPure.push(existing);
    } else {
      let newIng = await ingredients.create(ing);
      ingListPure.push(newIng);
    }
  }
  return ingListPure;
};
