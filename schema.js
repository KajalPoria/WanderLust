const Joi = require('joi');

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.alternatives().try(
            Joi.string().uri(), // Valid URL format
            Joi.string().allow("", null), // Empty string or null
            Joi.any().optional() // Fallback for any other case
        ).default(null), // Default value if not provided
        category: Joi.string().allow("").optional() // Add category field
    }).required()
});

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});

const bookingSchema = Joi.object({
    listingId: Joi.string().required(),
    checkIn: Joi.date().required().min('now'),
    checkOut: Joi.date().required().greater(Joi.ref('checkIn')),
    guests: Joi.number().required().min(1).max(20),
});

module.exports = { listingSchema, reviewSchema, bookingSchema };