const axios = require("axios");

// Nominatim geocoding service (OpenStreetMap - completely free, no API key needed)
let geocodingService = {
    forwardGeocode: async (location) => {
        try {
            let response = await axios.get("https://nominatim.openstreetmap.org/search", {
                params: {
                    q: location,
                    format: "json",
                    limit: 1,
                },
                headers: {
                    "User-Agent": "WanderLust/1.0", // Required by Nominatim
                },
            });

            if (response.data && response.data.length > 0) {
                let result = response.data[0];
                return {
                    type: "Point",
                    coordinates: [parseFloat(result.lon), parseFloat(result.lat)],
                };
            }
            return null;
        } catch (error) {
            console.log("Geocoding error:", error.message);
            return null;
        }
    },
};

module.exports = geocodingService;
