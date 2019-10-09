const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");
const authHelpers = require("../helpers/auth");
//Home routes
router.get("/", authHelpers.ensureGuest, controller.home);
router.get("/dashboard", authHelpers.ensureAuthentication, controller.dash);

//About Route
router.get("/about", controller.about);

module.exports = router;
