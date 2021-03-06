/*jshint esversion:6 */
// ========================
// Campgrounds routes
// ========================

const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware"); // you dont have to refer to "../middleware/index.js" because node will search for it as a default



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
router.post("/",middleware.isLogedin, function(req, res){
    // get data from form and add to campgrounds array
    const name =  req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const desc =  req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newCampground = {name: name, price: price, image: image, description: desc, author:author};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            // console.log(newlyCreated);
            req.flash("success", "New Campground has been created");
            res.redirect("/campgrounds");
        }
    });
});

// RESTful routing
//NEW -show form to create new campground
router.get("/new", middleware.isLogedin, function(req, res) {
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
router.get("/:id/edit", middleware.checkOwnershipAuthorization, function(req, res) {
  //is user loged in ?

  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", {
      campground: foundCampground
    });

  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkOwnershipAuthorization, function(req, res){
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
router.delete("/:id", middleware.checkOwnershipAuthorization, function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    }else{
      req.flash("error", "Campground has been deleted");
      res.redirect("/campgrounds");
    }
  });
});




module.exports = router;
