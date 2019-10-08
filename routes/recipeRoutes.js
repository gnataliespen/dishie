const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipeController");

router.route("/").get(controller.allRecipes);
router.route("/show/:id").get(controller.showRecipe);
router.get("/new", controller.newRecipePage);
router.post("/", controller.newRecipePost);

module.exports = router;
