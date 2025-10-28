const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required:true
    },
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing",
        },
    ],
});

userSchema.plugin(passportLocalMongoose);  // will auto add username , hashed function & salting

module.exports = mongoose.model('User', userSchema);