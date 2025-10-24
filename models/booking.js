const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
        min: 1,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
    },
    razorpayOrderId: {
        type: String,
    },
    razorpayPaymentId: {
        type: String,
    },
    razorpaySignature: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Calculate number of nights
bookingSchema.methods.getNumberOfNights = function() {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((this.checkOut - this.checkIn) / oneDay));
};

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
