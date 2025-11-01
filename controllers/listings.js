const Listing = require("../models/listing");
let geocodingService = require("../mapConfig");
module.exports.index = async (req, res) => {
    // Extract all potential query params
    const { q, category, minPrice, maxPrice, minRating } = req.query;

    let query = {};

    // 1. Category Filter
    if (category) {
        query.category = category;
    }

    // 2. Name/Location Search Filter (Case-insensitive)
    if (q) {
        query.$or = [
            { title: { $regex: q, $options: 'i' } },
            { location: { $regex: q, $options: 'i' } }
        ];
    }

    // 3. Price Range Filter
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) {
            query.price.$gte = Number(minPrice);
        }
        if (maxPrice) {
            query.price.$lte = Number(maxPrice);
        }
    }

    // 4. Rating Filter (This requires the avgRating in your model)
    if (minRating) {
        query.avgRating = { $gte: Number(minRating) };
    }

    // Find all listings matching the combined query
    const allListings = await Listing.find(query).populate("owner");
    
    // Pass the query params back to the template
    res.render("listings/index.ejs", { 
        allListings, 
        queryParams: req.query // This sends all query params back to the EJS
    });
};

module.exports.apiIndex = async (req, res) => {
    // Extract all potential query params
    const { q, category, minPrice, maxPrice, minRating } = req.query;

    let query = {};

    // 1. Category Filter
    if (category) {
        query.category = category;
    }

    // 2. Name/Location Search Filter (Case-insensitive)
    if (q) {
        query.$or = [
            { title: { $regex: q, $options: 'i' } },
            { location: { $regex: q, $options: 'i' } }
        ];
    }

    // 3. Price Range Filter
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) {
            query.price.$gte = Number(minPrice);
        }
        if (maxPrice) {
            query.price.$lte = Number(maxPrice);
        }
    }

    // 4. Rating Filter (This requires the avgRating in your model)
    if (minRating) {
        query.avgRating = { $gte: Number(minRating) };
    }

    // Find all listings matching the combined query
    const allListings = await Listing.find(query).populate("owner");
    
    res.json(allListings);
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
    const newListing= new Listing(req.body.listing);
    newListing.owner= req.user._id;
    
    // Check if file was uploaded
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url, filename};
    } else {
        // Set a default image if no file is uploaded
        newListing.image = {
            url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            filename: "default"
        };
    }
    
    // Get coordinates from location using geocoding
    try {
        let geoData = await geocodingService.forwardGeocode(req.body.listing.location);
        
        if (geoData) {
            newListing.geometry = geoData;
        }
    } catch (err) {
        console.log("Geocoding error:", err);
        // Continue with default coordinates if geocoding fails
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
    await listing.save();
    }
    
    // Update coordinates if location changed
    if (req.body.listing.location) {
        try {
            let geoData = await geocodingService.forwardGeocode(req.body.listing.location);
            
            if (geoData) {
                listing.geometry = geoData;
                await listing.save();
            }
        } catch (err) {
            console.log("Geocoding error:", err);
            // Continue without updating coordinates if geocoding fails
        }
    }
    
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.delete=async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};





