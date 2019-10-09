const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipeController");
const authHelpers = require("../helpers/auth");

router.get("/", controller.allRecipes);
router.get("/show/:id", controller.showRecipe);
router.get("/new", authHelpers.ensureAuthentication, controller.newRecipePage);
router.post("/", controller.newRecipePost);

module.exports = router;
