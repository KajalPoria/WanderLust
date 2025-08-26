const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isreviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

//Submitting the review form
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.submit));

//Delete review
router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapAsync(reviewController.deleteReview));


module.exports=router;