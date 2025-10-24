const Listing = require("../models/listing");
const geocodingClient = require("../mapConfig.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({}).populate("owner");
    res.render("listings/index.ejs", { allListings });
};

module.exports.new =  (req,res) =>{
    res.render("listings/new.ejs");
};

module.exports.show = async(req,res)=>{
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
};

module.exports.create = async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing= new Listing(req.body.listing);
    newListing.owner= req.user._id;
    newListing.image={url, filename};
    
    // Geocode the location to get coordinates
    try {
        const response = await geocodingClient
            .forwardGeocode({
                query: `${req.body.listing.location}, ${req.body.listing.country}`,
                limit: 1
            })
            .send();
        
        if (response && response.body.features.length > 0) {
            newListing.geometry = response.body.features[0].geometry;
        }
    } catch (error) {
        console.log("Geocoding error:", error);
        // If geocoding fails, use default coordinates
    }
    
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.edit = async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings"); //return used to exit the function otherwise it will continue to run
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};

module.exports.update =async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename};
    }
    
    // Update geocoding if location or country changed
    try {
        const response = await geocodingClient
            .forwardGeocode({
                query: `${req.body.listing.location}, ${req.body.listing.country}`,
                limit: 1
            })
            .send();
        
        if (response && response.body.features.length > 0) {
            listing.geometry = response.body.features[0].geometry;
        }
    } catch (error) {
        console.log("Geocoding error:", error);
    }
    
    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.delete=async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};





