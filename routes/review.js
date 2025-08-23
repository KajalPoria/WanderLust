const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isreviewAuthor} = require("../middleware.js");


//Submitting the review form
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}));

//Delete review
router.delete("/:reviewId",
    isLoggedIn,
    isreviewAuthor,
    wrapAsync(async (req,res)=>{
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewId}}); //pull request to remove like weeds from fields
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);
}));


module.exports=router;