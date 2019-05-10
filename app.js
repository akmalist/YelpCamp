/*jshint esversion:6 */
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const passport =require("passport");
const localStrategy = require("passport-local");
const request = require("request");
const mongoose = require("mongoose");
const Campground =require("./models/campground");
const Comment =require("./models/comment");
const User =require("./models/user");
var seedDB      = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true
});

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

// seedDB();

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
  res.locals.currentUser=req.user;
  //req.user comes from Passport
  //currentUser variable can be used in header templates
  next();
});



app.get("/", function(req, res) {
  res.render("landing");
});

// RESTful routing
//INDEX -show all campgrounds
app.get("/campgrounds", function(req, res) {
  //get data from  DB and render that file

  Campground.find({}, function(err, allCamps) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCamps
      });
    }
   });

});

// RESTful routing
//CREATE -add new camground to db
app.post("/campgrounds", function(req, res) {
  //requesting data from post input
  const name = req.body.campName;
  const image = req.body.image;
  const desc= req.body.description;

  const newCampground = {
    name: name,
    image: image,
    description:desc,
    comment:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
      }
    ]
  };
   //create a new campground and save it to database
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");

    }
  });

});

// RESTful routing
//NEW -show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});


// RESTful routing
//// ID:
// find the campground with provided ID
// render show template with that campground


//SHOW -shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      // console.log(foundCampground);
      res.render("campgrounds/show", {campground:foundCampground});
    }
  });
});


// ========================
// Comments section
// ========================

app.get("/campgrounds/:id/comments/new", isLogedin, function(req,res){
    // find Campground by id and render comments
    Campground.findById(req.params.id, function(err, campground){
      if(err){
        console.log(err);
      }else{
          res.render("comments/new",{campground:campground});
      }
    });

});


app.post("/campgrounds/:id/comments", isLogedin, function(req, res){
 Campground.findById(req.params.id, function(err, campground){
   if(err){
     console.log(err);
     res.redirect("/campgrounds");
   }else{
     Comment.create(req.body.comment, function(err, comment){
       if(err){
         console.log(err);
       }else{
         campground.comments.push(comment);
         campground.save();
         res.redirect("/campgrounds/" +campground._id);
       }
     });
   }
 });
});

//******************* Passport registration request***********************//

app.get("/register", function(req,res){
  res.render("register");
});


app.post("/register", function(req,res){
  const newUser = new User({username:req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});


//******************* Passport login request***********************//

app.get("/login", function(req,res){
  res.render("login");

});


app.post("/login", passport.authenticate("local",
{
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res){
});


///log out route

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/campgrounds");
});


// check if the user is logedin
function isLogedin(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


app.listen(3000, function() {
  console.log("App is running on port 3000");
});
