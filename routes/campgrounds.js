/*jshint esversion:6 */
// ========================
// Campgrounds routes
// ========================

const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// RESTful routing
//INDEX -show all campgrounds
router.get("/", function(req, res) {
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
//CREATE - add new campground to DB
router.post("/",isLogedin, function(req, res){
    // get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newCampground = {name: name, image: image, description: desc, author:author};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

// RESTful routing
//NEW -show form to create new campground
router.get("/new", isLogedin, function(req, res) {
  res.render("campgrounds/new");
});


// RESTful routing
//// ID:
// find the campground with provided ID
// render show template with that campground


//SHOW -shows more info about one campground
router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      // console.log(foundCampground);
      res.render("campgrounds/show", {campground:foundCampground});
    }
  });
});


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", checkAuthorization, function(req, res) {
  //is user loged in ?

  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", {
      campground: foundCampground
    });

  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",checkAuthorization, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

//DESTROY  CAMPGROUND ROUTE
router.delete("/:id",checkAuthorization, function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds");
    }
  });
});


//middleware
// check if the user is logedin
function isLogedin(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}



//another middleware to check if the user is authorized to edit campgrounds
//is user loged in ?

function checkAuthorization(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          return next();
          // res.render("campgrounds/edit", {campground: foundCampground});
        }else {
          //otherwise redirect
          res.redirect("back");
        }
      }

    });
  } else {
    //otherwise redirect
    res.redirect("back");
  }
}

module.exports = router;
