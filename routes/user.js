const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router
.route("/signup")
.get(userController.rendersignup)   //For signup logic
.post(wrapAsync(userController.signup))  //For signup form

router.route("/login")
.get(userController.loginrender)  //For login form
.post(                             //For login logic
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),userController.login);


// LOGOUT
router.get("/logout",userController.logout);

module.exports = router;