if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const wishlistRouter = require("./routes/wishlist.js");
const recommendationsRouter = require("./routes/recommendations.js");
const bookingRouter = require("./routes/booking.js");
const chatbotRouter = require("./routes/chatbot.js");

const dbUrl = process.env.ATLAS_URL;

main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // For parsing JSON payloads
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret:process.env.SECRET ,
    },
    touchAfter: 24*3600,
});

store.on("error", () =>{
    console.log("Error in Mongo Session Store", err);
});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60* 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(express.static('public'));

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ... (Your file content from line 1 to 85)

// MIDDLEWARE
app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

const { checkConsent } = require("./middleware.js");
app.use(checkConsent);


// ROUTES
app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/", userRouter); // Handles /signup, /login, /logout, /consent
app.use("/listings", listingsRouter); // Handles /listings, /listings/:id, etc.
app.use("/listings/:id/reviews", reviewsRouter); // Handles /listings/:id/reviews
app.use("/wishlist", wishlistRouter);
app.use("/recommendations", recommendationsRouter);
app.use("/bookings", bookingRouter);
app.use("/api/chatbot", chatbotRouter); // ADDED: The new chatbot API route


// 404 CATCH-ALL HANDLER
// This must be AFTER all other valid routes
app.all(/.*/, (req, res, next) => {
        next(new ExpressError(404, "Page Not Found"));
    });

// FINAL ERROR HANDLER
// This must be at the very end
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;

    // Check if the request was for an API route
    if (req.originalUrl && req.originalUrl.startsWith("/api/")) {
        // Send JSON error for API routes
        return res.status(statusCode).json({ error: message });
    }

    // Render HTML error page for all other routes
    res.status(statusCode).render("error.ejs", {
        message,
        currUser: res.locals.currUser,
        success: res.locals.success,
        error: res.locals.error,
    });
});

app.listen(8080, ()=>{
    console.log("server is listening to port at 8080")
});