require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../models/listing');
const seed = require('../init/data');

const dbUrl = process.env.ATLAS_URL || process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/wonderLust';

async function run() {
  await mongoose.connect(dbUrl);
  console.log('Connected to DB');

  // Build a lookup by English title from seed data
  const byTitle = new Map();
  for (const item of seed.data) {
    if (item.title) {
      byTitle.set(item.title, item);
    }
  }

  const listings = await Listing.find({});
  let updated = 0;
  for (const doc of listings) {
    const match = byTitle.get(doc.title);
    if (!match) continue;

    const set = {};
    if (match.title_i18n) set.title_i18n = match.title_i18n;
    if (match.description_i18n) set.description_i18n = match.description_i18n;

    if (Object.keys(set).length > 0) {
      await Listing.updateOne({ _id: doc._id }, { $set: set });
      updated++;
    }
  }

  console.log(`Updated ${updated} listing(s) with i18n fields.`);
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
