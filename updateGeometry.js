// Script to update existing listings with geometry data
require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const geocodingService = require("./mapConfig");

// Connect to database
async function main() {
    await mongoose.connect(process.env.ATLAS_URL);
    console.log("Connected to database");
}

async function updateListingsGeometry() {
    try {
        await main();
        
        // Find all listings without geometry or with default coordinates
        let listings = await Listing.find({
            $or: [
                { geometry: { $exists: false } },
                { "geometry.coordinates": [0, 0] }
            ]
        });

        console.log(`Found ${listings.length} listings to update`);

        for (let listing of listings) {
            console.log(`\nProcessing: ${listing.title} (${listing.location})`);
            
            try {
                let geoData = await geocodingService.forwardGeocode(listing.location);
                
                if (geoData) {
                    listing.geometry = geoData;
                    await listing.save();
                    console.log(`✓ Updated with coordinates: [${geoData.coordinates[0]}, ${geoData.coordinates[1]}]`);
                } else {
                    console.log(`✗ Could not geocode ${listing.location}`);
                }
                
                // Add delay to respect Nominatim's rate limit (1 request per second)
                await new Promise(resolve => setTimeout(resolve, 1100));
                
            } catch (err) {
                console.log(`✗ Error geocoding ${listing.title}:`, err.message);
            }
        }

        console.log("\n✅ Finished updating listings!");
        process.exit(0);
        
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

updateListingsGeometry();
