const Booking = require("../models/booking");
const Listing = require("../models/listing");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Show booking form
module.exports.showBookingForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("bookings/checkout.ejs", { listing });
};

// Create Razorpay order
module.exports.createOrder = async (req, res) => {
    try {
        const { listingId, checkIn, checkOut, guests } = req.body;
        
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found" });
        }

        // Calculate total price
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.round(Math.abs((checkOutDate - checkInDate) / (24 * 60 * 60 * 1000)));
        const totalPrice = listing.price * nights;

        // Create booking in database
        const booking = new Booking({
            listing: listingId,
            user: req.user._id,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests: guests,
            totalPrice: totalPrice,
            paymentStatus: "pending",
        });
        await booking.save();

        // Create Razorpay order
        const options = {
            amount: totalPrice * 100, // amount in paise
            currency: "INR",
            receipt: `booking_${booking._id}`,
            notes: {
                bookingId: booking._id.toString(),
                listingId: listingId,
                userId: req.user._id.toString(),
            },
        };

        const order = await razorpay.orders.create(options);
        
        // Update booking with order ID
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

// Verify payment
module.exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

        // Verify signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment is successful
            const booking = await Booking.findById(bookingId);
            if (booking) {
                booking.paymentStatus = "completed";
                booking.razorpayPaymentId = razorpay_payment_id;
                booking.razorpaySignature = razorpay_signature;
                await booking.save();

                req.flash("success", "Booking confirmed! Payment successful.");
                return res.json({ success: true, redirectUrl: `/bookings/${bookingId}` });
            }
        } else {
            // Invalid signature
            const booking = await Booking.findById(bookingId);
            if (booking) {
                booking.paymentStatus = "failed";
                await booking.save();
            }
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, message: "Payment verification failed" });
    }
};

// Webhook handler for Razorpay events
module.exports.webhook = async (req, res) => {
    try {
        const signature = req.headers["x-razorpay-signature"];
        const body = JSON.stringify(req.body);

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(body)
            .digest("hex");

        if (signature === expectedSignature) {
            const event = req.body.event;
            const paymentEntity = req.body.payload.payment.entity;

            if (event === "payment.captured") {
                // Payment captured successfully
                const bookingId = paymentEntity.notes.bookingId;
                const booking = await Booking.findById(bookingId);
                if (booking && booking.paymentStatus === "pending") {
                    booking.paymentStatus = "completed";
                    booking.razorpayPaymentId = paymentEntity.id;
                    await booking.save();
                }
            } else if (event === "payment.failed") {
                // Payment failed
                const bookingId = paymentEntity.notes.bookingId;
                const booking = await Booking.findById(bookingId);
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

// Show all bookings for current user
module.exports.index = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate("listing")
        .sort({ createdAt: -1 });
    res.render("bookings/index.ejs", { bookings });
};

// Show specific booking
module.exports.show = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id)
        .populate("listing")
        .populate("user");
    
    if (!booking) {
        req.flash("error", "Booking not found!");
        return res.redirect("/bookings");
    }

    // Check if user is authorized to view this booking
    if (!booking.user._id.equals(req.user._id)) {
        req.flash("error", "You don't have permission to view this booking!");
        return res.redirect("/bookings");
    }

    res.render("bookings/show.ejs", { booking });
};

// Cancel booking (only if payment is pending)
module.exports.cancel = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);

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
