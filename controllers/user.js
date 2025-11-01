const User = require("../models/user.js");

module.exports.rendersignup=(req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup=async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust! Please review our privacy settings.");
            res.redirect("/consent");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.loginrender=(req, res) => {
    res.render("users/login.ejs");
};

module.exports.login=async(req, res) => {
        if (req.user.consentForRecommendations === 'pending') {
            req.flash("info", "To enhance your experience, please set your recommendation preference.");
            return res.redirect("/consent"); // Redirect to the new consent page
        }
        req.flash("success", "Welcome back to WanderLust!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);   //  FIXED
    };

module.exports.logout=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};

// ADDED: Controller to render the consent form
module.exports.renderConsentForm = (req, res) => {
    res.render("users/consent.ejs");
};
module.exports.handleConsent = async (req, res) => {
    const { consentDecision } = req.body; // 'accepted' or 'declined'
    
    if (!consentDecision || !['accepted', 'declined'].includes(consentDecision)) {
        req.flash("error", "Invalid choice. Please try again.");
        return res.redirect("/consent");
    }
    
    await User.findByIdAndUpdate(req.user._id, { 
        consentForRecommendations: consentDecision 
    });
    
    req.flash("success", "Your preference has been saved!");
    res.redirect("/listings");
};