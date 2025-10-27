let mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
let mapToken = process.env.MAP_TOKEN;

// Initialize geocoding service with access token
let geocodingService = mbxGeocoding({ accessToken: mapToken });

module.exports = geocodingService;
