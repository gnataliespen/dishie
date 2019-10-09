const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/authController");

//Login routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  controller.home,
);

//Logout
router.get("/logout", controller.logOut);

module.exports = router;
