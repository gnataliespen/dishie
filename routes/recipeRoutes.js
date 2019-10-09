const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipeController");
const authHelpers = require("../helpers/auth");

router.get("/", controller.allRecipes);
router.get("/show/:id", controller.showRecipe);
router.get("/new", authHelpers.ensureAuthentication, controller.newRecipePage);
router.post("/", authHelpers.ensureAuthentication, controller.newRecipePost);
router.get(
  "/edit/:id",
  authHelpers.ensureAuthentication,
  controller.editRecipePage,
);
router.put("/:id", authHelpers.ensureAuthentication, controller.editRecipe);
router.delete(
  "/:id",
  authHelpers.ensureAuthentication,
  controller.deleteRecipe,
);

router.post("/comment/:id", controller.comment);
router.get("/show/save/:id", controller.saveRecipe);

module.exports = router;
