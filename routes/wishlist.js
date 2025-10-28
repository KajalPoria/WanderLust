const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const wishlistController = require("../controllers/wishlist.js");

// View wishlist
router.get("/", isLoggedIn, wrapAsync(wishlistController.getWishlist));

// Add to wishlist
router.post("/:listingId", isLoggedIn, wrapAsync(wishlistController.addToWishlist));

// Remove from wishlist
router.delete("/:listingId", isLoggedIn, wrapAsync(wishlistController.removeFromWishlist));

// Toggle wishlist (AJAX endpoint)
router.put("/:listingId/toggle", isLoggedIn, wrapAsync(wishlistController.toggleWishlist));

module.exports = router;
