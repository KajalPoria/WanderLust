const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const listingController = require("../controllers/listings.js");


router
.route("/")
.get(wrapAsync(listingController.index)) //for index route
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync (listingController.create));  //for create route

//New Route(Should be added before show otherwise will assume new as id)
router.get("/new",isLoggedIn, listingController.new);

router
.route("/:id")
.get(wrapAsync(listingController.show))   //for show route
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync (listingController.update))  //for update route
.delete(isLoggedIn,isOwner,wrapAsync (listingController.delete))     //for delete route


//Edit Route
router.get("/:id/edit" ,isLoggedIn, isOwner,wrapAsync(listingController.edit));

// API route for listings
router.get("/api", wrapAsync(listingController.apiIndex));

module.exports= router;