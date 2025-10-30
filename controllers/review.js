const Review = require("../models/review");
const Listing = require("../models/listing.js");

// Helper function to update average rating
async function updateAvgRating(listingId) {
    try {
        const listing = await Listing.findById(listingId).populate("reviews");
        if (!listing) return;

        if (listing.reviews.length === 0) {
            listing.avgRating = 0;
        } else {
            let totalRating = listing.reviews.reduce((acc, review) => acc + review.rating, 0);
            listing.avgRating = parseFloat((totalRating / listing.reviews.length).toFixed(2));
        }
        await listing.save();
    } catch (err) {
        console.error("Error updating average rating:", err);
    }
}

module.exports.submit=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    await updateAvgRating(req.params.id);
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview=async (req,res)=>{
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewId}}); //pull request to remove like weeds from fields
    await Review.findByIdAndDelete(reviewId);
    await updateAvgRating(id);
    req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);
};