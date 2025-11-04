require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../models/listing');

(async () => {
  try {
    const dbUrl = process.env.ATLAS_URL || 'mongodb://127.0.0.1:27017/wanderlust';
    await mongoose.connect(dbUrl);
    const docs = await Listing.find({}, { title: 1, location: 1, country: 1, geometry: 1 }).limit(5).lean();
    console.log(JSON.stringify(docs, null, 2));
    await mongoose.disconnect();
  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  }
})();
