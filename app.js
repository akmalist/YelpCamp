/*jshint esversion:6 */
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const passport =require("passport");
const localStrategy = require("passport-local");
const request = require("request");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const Campground =require("./models/campground");
const Comment =require("./models/comment");
const User =require("./models/user");
const seedDB      = require("./seeds");


//requring routes from different folder
const campgroundRoutes = require("./routes/campgrounds"),
      authRoutes       = require("./routes/auth"),
      commentRoutes    = require("./routes/comments");


mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true
});

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(flash());
// seed database
seedDB();


//check for mongoose db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


////////////////Configure Passport//////////////////////////

app.use(require("express-session") ({
                  secret:"Mega secret",
                  resave:false,
                  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// this will call the function check if the user is loged in every route app.get or post requests
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  //req.user comes from Passport
  //currentUser variable can be used in header templates
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success"); //will create a global variable error/success that can be available in every template on your app

  next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/", authRoutes);
app.use("/campgrounds/:id/comments/", commentRoutes);


app.listen(3000, function() {
  console.log("App is running on port 3000");
});
