/*jshint esversion:6 */
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true
});

//check for mongoose db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

//create a schema

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

//create a module

const Campground = mongoose.model("Campground", campgroundSchema);



//initial data

// const campgrounds = [{
//     name: "Salmon Creek",
//     image: "images/salmonCreek.JPG"
//   },
//   {
//     name: "Granite Hill",
//     image: "images/graniteHill.jpg"
//   },
//   {
//     name: "Mountain Goat's Rest",
//     image: "images/mountainGoat.jpg"
//   },
//   {
//     name: "Salmon Creek",
//     image: "images/salmonCreek.JPG"
//   },
//   {
//     name: "Granite Hill",
//     image: "images/graniteHill.jpg"
//   },
//   {
//     name: "Mountain Goat's Rest",
//     image: "images/mountainGoat.jpg"
//   },
//   {
//     name: "Mountain Goat's Rest",
//     image: "images/mountainGoat.jpg"
//   },
//   {
//     name: "Mountain Goat's Rest",
//     image: "images/mountainGoat.jpg"
//   }
//
//
//
//
// ];


// Campground.create(  {
//     name: "Mountain Goat's Rest",
//     image: "images/mountainGoat.jpg",
//     description: "Great Camping place, but no water!"
//   }, function(err,newlyCreated){
//     if(err){
//       console.log(err);
//     }else{
//       console.log("NEWLY CREATED CAMPGROUND!");
//       console.log(newlyCreated);
//     }
//
//   });

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
      res.render("index", {
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
    description:desc
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
  res.render("new");
});


// RESTful routing
//// ID:
// find the campground with provided ID
// render show template with that campground


//SHOW -shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
//   What this is doing is passing the value of foundCampground which is w/e campground is found by your Campground.findById  callback and you are passing it to the front end or your show partial AS campground.  So on the front end with your partial you get the data by doing
//  <% campground.whatever %> and you will have that data on your front end.
Campground.findByID(req.params.id, function(err, newCamp){
    if(err){
      console.log(err);
    }else{
      res.render("show", {camground:newCamp});
    }
  });





});

app.listen(3000, function() {
  console.log("App is running on port 3000");
});
