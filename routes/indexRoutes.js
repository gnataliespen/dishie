const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");

router.route("/").get(controller.home);

router.route("/about").get(controller.about);

module.exports = router;
