const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


//Index Route
router.get("/", async (req, res) => {
    const allListings = await Listing.find({}).populate("owner");
    res.render("listings/index", { allListings });
});
//New Route(Should be added before show otherwise will assume new as id)
router.get("/new",isLoggedIn,isOwner, (req,res) =>{
    res.render("listings/new.ejs")
});

//Show Route
router.get("/:id", wrapAsync(async(req,res)=>{
let {id} = req.params;
const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings"); //return used to exit the function otherwise it will continue to run
    }
    console.log(listing);
res.render("listings/show.ejs" , {listing});
}));

//Create Route
router.post("/",
    isLoggedIn,validateListing,wrapAsync (async(req,res,next)=>{
    const newListing= new Listing(req.body.listing);
    newListing.owner= req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit" ,
    isLoggedIn,
    isOwner,
    wrapAsync (async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings"); //return used to exit the function otherwise it will continue to run
    }
    res.render("listings/edit.ejs", {listing});
}));

//Update route
router.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync (async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync (async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}));

module.exports= router;