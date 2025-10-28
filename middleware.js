const Listing = require("./models/listing");
const Review = require("./models/review");
const Booking = require("./models/booking");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema, bookingSchema }= require("./schema.js");


module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl= req.originalUrl;
        req.flash("error", "You must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have access!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req,res,next)=>{
    // Create a copy of req.body for validation
    let dataToValidate = {...req.body};
    
    // If file is uploaded, remove image field from validation
    if(req.file && dataToValidate.listing) {
        delete dataToValidate.listing.image;
    }
    
    let {error}=listingSchema.validate(dataToValidate);
    if(error){
        let errMsg= error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.validateReview = (req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg= error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.isreviewAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have access!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateBooking = (req,res,next)=>{
    let {error}=bookingSchema.validate(req.body);
    if(error){
        let errMsg= error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.isBookingOwner = async(req,res,next)=>{
    let {id} = req.params;
    let booking = await Booking.findById(id);
    if(!booking){
        req.flash("error", "Booking not found!");
        return res.redirect("/bookings");
    }
    if(!booking.user.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have access to this booking!");
        return res.redirect("/bookings");
    }
    next();
};
