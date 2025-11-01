const Booking = require("../models/booking");
const Listing = require("../models/listing");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay with keys from environment (optional for offline feature testing)
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log("✓ Razorpay initialized successfully");
} else {
    console.warn("⚠ Razorpay credentials not found. Payment features will be disabled.");
}

// Render booking checkout page
module.exports.showBookingForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings"); 
    }
    res.render("bookings/checkout.ejs", { listing });
};

// Create order for payment processing
module.exports.createOrder = async (req, res) => {
    try {
        // Check if Razorpay is configured
        if (!razorpay) {
            return res.status(503).json({ 
                success: false, 
                message: "Payment service is not configured. Please contact administrator." 
            });
        }

        let { listingId, checkIn, checkOut, guests } = req.body;

        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found" });
        }

        // Calculate nights and total amount
        let checkInDate = new Date(checkIn);
        let checkOutDate = new Date(checkOut);
        let nights = Math.round(Math.abs((checkOutDate - checkInDate) / (24 * 60 * 60 * 1000)));
        let totalPrice = listing.price * nights;

        // Save booking with pending status
        let booking = new Booking({
            listing: listingId,
            user: req.user._id,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests: guests,
            totalPrice: totalPrice,
            paymentStatus: "pending",
        });
        await booking.save();

        // Create payment order
        let options = {
            amount: totalPrice * 100, // convert to paise
            currency: "INR",
            receipt: `receipt_${booking._id}`,
            notes: {
                bookingId: booking._id.toString(),
                listingId: listingId,
            },
        };

        const order = await razorpay.orders.create(options);

        // Update booking with razorpay order id
        booking.razorpayOrderId = order.id;
        await booking.save();

        res.json({
            success: true,
            order: order,
            bookingId: booking._id,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
};

// Verify payment signature
module.exports.verifyPayment = async (req, res) => {
    try {
        // Check if Razorpay is configured
        if (!razorpay) {
            return res.status(503).json({ 
                success: false, 
                message: "Payment service is not configured." 
            });
        }

        let { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

        // Generate expected signature for verification
        let sign = razorpay_order_id + "|" + razorpay_payment_id;
        let expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // Check if signature matches
        if (razorpay_signature === expectedSign) {
            let booking = await Booking.findById(bookingId);
            if (booking) {
                booking.paymentStatus = "completed";
                booking.razorpayPaymentId = razorpay_payment_id;
                booking.razorpaySignature = razorpay_signature;
                await booking.save();

                req.flash("success", "Booking confirmed! Payment successful.");
                return res.json({ success: true, redirectUrl: `/bookings/${bookingId}` });
            }
        } else {
            // Signature verification failed
            let booking = await Booking.findById(bookingId);
            if (booking) {
                booking.paymentStatus = "failed";
                await booking.save();
            }
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, message: "Payment verification failed" });
    }
};

// Webhook for razorpay events
module.exports.webhook = async (req, res) => {
    try {
        const webhookSignature = req.headers["x-razorpay-signature"];
        const webhookBody = JSON.stringify(req.body);

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "")
            .update(webhookBody)
            .digest("hex");

        if (webhookSignature === expectedSignature) {
            let event = req.body.event;
            let paymentEntity = req.body.payload.payment.entity;

            if (event === "payment.captured") {
                let bookingId = paymentEntity.notes.bookingId;
                let booking = await Booking.findById(bookingId);
                if (booking && booking.paymentStatus === "pending") {
                    booking.paymentStatus = "completed";
                    booking.razorpayPaymentId = paymentEntity.id;
                    await booking.save();
                }
            } else if (event === "payment.failed") {
                let bookingId = paymentEntity.notes.bookingId;
                let booking = await Booking.findById(bookingId);
                if (booking) {
                    booking.paymentStatus = "failed";
                    await booking.save();
                }
            }

            res.status(200).json({ status: "ok" });
        } else {
            res.status(400).json({ status: "invalid signature" });
        }
    } catch (error) {
        console.error("Webhook error:", error);
        res.status(500).json({ status: "error" });
    }
};

// Display all bookings for user
module.exports.index = async (req, res) => {
    let bookings = await Booking.find({ user: req.user._id })
        .populate("listing")
        .sort({ createdAt: -1 });
    res.render("bookings/index.ejs", { bookings });
};

// Show single booking details
module.exports.show = async (req, res) => {
    let {id} = req.params;
    let booking = await Booking.findById(id)
        .populate("listing")
        .populate("user");

    if (!booking) {
        req.flash("error", "Booking not found!");
        return res.redirect("/bookings");
    }

    // Authorization check
    if (!booking.user._id.equals(req.user._id)) {
        req.flash("error", "You don't have permission to view this booking!");
        return res.redirect("/bookings");
    }

    res.render("bookings/show.ejs", { booking });
};

// Cancel pending booking
module.exports.cancel = async (req, res) => {
    let {id} = req.params;
    let booking = await Booking.findById(id);

    if (!booking) {
        req.flash("error", "Booking not found!");
        return res.redirect("/bookings");
    }

    if (!booking.user.equals(req.user._id)) {
        req.flash("error", "You don't have permission to cancel this booking!");
        return res.redirect("/bookings");
    }

    if (booking.paymentStatus === "pending") {
        await Booking.findByIdAndDelete(id);
        req.flash("success", "Booking cancelled successfully!");
    } else {
        req.flash("error", "Cannot cancel a confirmed booking. Please contact support.");
    }

    res.redirect("/bookings");
};
