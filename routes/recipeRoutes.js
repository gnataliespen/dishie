const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipeController");
const authHelpers = require("../helpers/auth");

//All route
router.get("/", controller.allRecipes);
//Specific Route
router.get("/show/:id", controller.showRecipe);
//New recipe form route
router.get("/new", authHelpers.ensureAuthentication, controller.newRecipePage);
//New recipe POST route
router.post("/", authHelpers.ensureAuthentication, controller.newRecipePost);
//Edit form route
router.get(
  "/edit/:id",
  authHelpers.ensureAuthentication,
  controller.editRecipePage,
);
//Edit PUT route
router.put("/:id", authHelpers.ensureAuthentication, controller.editRecipe);
//Delete route
router.delete(
  "/:id",
  authHelpers.ensureAuthentication,
  controller.deleteRecipe,
);

//Comment POST route
router.post("/comment/:id", controller.comment);
//Save recipe route
router.get("/show/save/:id", controller.saveRecipe);
//Search route
router.post("/search", controller.search);

module.exports = router;
