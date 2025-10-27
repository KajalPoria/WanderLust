const Listing = require("../models/listing");
const User = require("../models/user");
const Review = require("../models/review");

// AI-Powered Recommendation Algorithm
module.exports.getRecommendations = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId)
            .populate('wishlist')
            .exec();

        // Get user's reviews
        const userReviews = await Review.find({ author: userId })
            .populate('_id')
            .exec();

        // Get categories from wishlist
        const wishlistCategories = user.wishlist.map(listing => listing.category);
        const wishlistCountries = user.wishlist.map(listing => listing.country);

        // Get categories from highly rated reviews (4-5 stars)
        const reviewedListingIds = userReviews
            .filter(review => review.rating >= 4)
            .map(review => review._id);

        // Build recommendation criteria
        let recommendationCriteria = {};
        
        if (wishlistCategories.length > 0 || wishlistCountries.length > 0) {
            recommendationCriteria.$or = [];
            
            if (wishlistCategories.length > 0) {
                recommendationCriteria.$or.push({
                    category: { $in: wishlistCategories }
                });
            }
            
            if (wishlistCountries.length > 0) {
                recommendationCriteria.$or.push({
                    country: { $in: wishlistCountries }
                });
            }
        }

        // Exclude listings already in wishlist or owned by user
        const excludeIds = [...user.wishlist.map(l => l._id), userId];
        recommendationCriteria._id = { $nin: excludeIds };
        recommendationCriteria.owner = { $ne: userId };

        // Get recommended listings
        let recommendations = await Listing.find(recommendationCriteria)
            .populate('owner')
            .limit(12)
            .exec();

        // If not enough recommendations, add popular listings
        if (recommendations.length < 6) {
            const popularListings = await Listing.find({
                _id: { $nin: excludeIds },
                owner: { $ne: userId }
            })
            .populate('owner')
            .populate('reviews')
            .limit(12)
            .exec();

            // Merge and deduplicate
            const existingIds = new Set(recommendations.map(r => r._id.toString()));
            popularListings.forEach(listing => {
                if (!existingIds.has(listing._id.toString()) && recommendations.length < 12) {
                    recommendations.push(listing);
                    existingIds.add(listing._id.toString());
                }
            });
        }

        res.render("users/recommendations.ejs", { 
            recommendations,
            wishlistCount: user.wishlist.length,
            reviewCount: userReviews.length
        });
    } catch (error) {
        console.error('Error generating recommendations:', error);
        req.flash("error", "Could not generate recommendations!");
        res.redirect("/listings");
    }
};

// Get personalized suggestions based on user activity
module.exports.getSuggestions = async (userId) => {
    try {
        const user = await User.findById(userId).populate('wishlist');
        const userReviews = await Review.find({ author: userId });

        // Analyze user preferences
        const preferences = {
            categories: [],
            countries: [],
            priceRange: { min: 0, max: Infinity }
        };

        // Extract preferences from wishlist
        if (user.wishlist.length > 0) {
            user.wishlist.forEach(listing => {
                if (listing.category) preferences.categories.push(listing.category);
                if (listing.country) preferences.countries.push(listing.country);
            });
        }

        // Calculate average price preference
        if (user.wishlist.length > 0) {
            const prices = user.wishlist.map(l => l.price);
            const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
            preferences.priceRange = {
                min: avgPrice * 0.7,
                max: avgPrice * 1.5
            };
        }

        return preferences;
    } catch (error) {
        console.error('Error getting suggestions:', error);
        return null;
    }
};
