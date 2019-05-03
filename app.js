/*jshint esversion:6 */
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const Campground =require("./models/campground");
const Comment =require("./models/comment");
var seedDB      = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true
});

app.use(express.static("public"));
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
//
//
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

app.get("/campgrounds/:id/comments/new",function(req,res){
    // find Campground by id and render comments
    Campground.findById(req.params.id, function(err, campground){
      if(err){
        console.log(err);
      }else{
          res.render("comments/new",{campground:campground});
      }
    });

});


app.post("/campgrounds/:id/comments", function(req, res){
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

 


app.listen(3000, function() {
  console.log("App is running on port 3000");
});
