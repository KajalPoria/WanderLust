const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const bookingController = require("../controllers/booking.js");

// Show booking form for a listing
router.get("/new/:id", isLoggedIn, wrapAsync(bookingController.showBookingForm));

// Create Razorpay order
router.post("/create-order", isLoggedIn, wrapAsync(bookingController.createOrder));

// Verify payment
router.post("/verify-payment", isLoggedIn, wrapAsync(bookingController.verifyPayment));

// Webhook endpoint for Razorpay (no authentication middleware)
router.post("/webhook", wrapAsync(bookingController.webhook));

// Show all bookings for logged in user
router.get("/", isLoggedIn, wrapAsync(bookingController.index));

// Show specific booking
router.get("/:id", isLoggedIn, wrapAsync(bookingController.show));

// Cancel booking
router.delete("/:id", isLoggedIn, wrapAsync(bookingController.cancel));

module.exports = router;
