const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const recommendationsController = require("../controllers/recommendations.js");

// Get personalized recommendations
router.get("/", isLoggedIn, wrapAsync(recommendationsController.getRecommendations));

module.exports = router;
