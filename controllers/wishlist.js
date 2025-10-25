const User = require("../models/user");
const Listing = require("../models/listing");

// Add listing to wishlist
module.exports.addToWishlist = async (req, res) => {
    try {
        const { listingId } = req.params;
        const userId = req.user._id;

        const user = await User.findById(userId);
        
        // Check if listing is already in wishlist
        if (!user.wishlist.includes(listingId)) {
            user.wishlist.push(listingId);
            await user.save();
            req.flash("success", "Added to wishlist!");
        } else {
            req.flash("error", "Already in wishlist!");
        }
        
        res.redirect("back");
    } catch (error) {
        req.flash("error", "Something went wrong!");
        res.redirect("back");
    }
};

// Remove listing from wishlist
module.exports.removeFromWishlist = async (req, res) => {
    try {
        const { listingId } = req.params;
        const userId = req.user._id;

        await User.findByIdAndUpdate(userId, {
            $pull: { wishlist: listingId }
        });

        req.flash("success", "Removed from wishlist!");
        res.redirect("back");
    } catch (error) {
        req.flash("error", "Something went wrong!");
        res.redirect("back");
    }
};

// Get user's wishlist
module.exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate({
            path: "wishlist",
            populate: {
                path: "owner"
            }
        });

        res.render("users/wishlist.ejs", { wishlist: user.wishlist });
    } catch (error) {
        req.flash("error", "Could not load wishlist!");
        res.redirect("/listings");
    }
};

// Toggle wishlist (for AJAX)
module.exports.toggleWishlist = async (req, res) => {
    try {
        const { listingId } = req.params;
        const userId = req.user._id;

        const user = await User.findById(userId);
        
        let isInWishlist = user.wishlist.includes(listingId);
        
        if (isInWishlist) {
            await User.findByIdAndUpdate(userId, {
                $pull: { wishlist: listingId }
            });
            res.json({ success: true, inWishlist: false, message: "Removed from wishlist" });
        } else {
            user.wishlist.push(listingId);
            await user.save();
            res.json({ success: true, inWishlist: true, message: "Added to wishlist" });
        }
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};
