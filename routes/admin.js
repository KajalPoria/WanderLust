const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const seed = require("../init/data");

// TEMPORARY: Migration endpoint to add i18n fields to existing listings
// Access this once after deployment to update production DB
// Then remove this file or comment out the route for security
router.get("/migrate-i18n", async (req, res) => {
    try {
        // Build a lookup by English title from seed data
        const byTitle = new Map();
        for (const item of seed.data) {
            if (item.title) {
                byTitle.set(item.title, item);
            }
        }

        const listings = await Listing.find({});
        let updated = 0;
        let skipped = 0;

        for (const doc of listings) {
            const match = byTitle.get(doc.title);
            if (!match) {
                skipped++;
                continue;
            }

            const set = {};
            if (match.title_i18n) set.title_i18n = match.title_i18n;
            if (match.description_i18n) set.description_i18n = match.description_i18n;

            if (Object.keys(set).length > 0) {
                await Listing.updateOne({ _id: doc._id }, { $set: set });
                updated++;
            }
        }

        res.json({
            success: true,
            message: `Migration complete! Updated ${updated} listing(s), skipped ${skipped}.`,
            updated,
            skipped,
            total: listings.length
        });
    } catch (error) {
        console.error("Migration error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
