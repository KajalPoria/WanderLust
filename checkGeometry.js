// Check geometry status of all listings
require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

async function main() {
    await mongoose.connect(process.env.ATLAS_URL);
    console.log("Connected to database\n");
}

async function checkListings() {
    try {
        await main();
        
        let allListings = await Listing.find({});
        console.log(`Total listings: ${allListings.length}\n`);

        for (let listing of allListings) {
            console.log(`${listing.title}`);
            console.log(`  Location: ${listing.location}`);
            if (listing.geometry) {
                console.log(`  Geometry: ${JSON.stringify(listing.geometry)}`);
            } else {
                console.log(`  Geometry: NOT SET`);
            }
            console.log('');
        }

        process.exit(0);
        
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkListings();
