/* jshint esversion:6*/
//middleware

const Campground = require("../models/campground");
const Comment = require("../models/comment");


middleware = {};

// check if the user is logedin
middleware.isLogedin = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
//another middleware to check if the user is authorized to edit campgrounds
//is user loged in ?

middleware.checkOwnershipAuthorization = function(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          return next();
          // res.render("campgrounds/edit", {campground: foundCampground});
        } else {
          //otherwise redirect
          res.redirect("back");
        }
      }

    });
  } else {
    //otherwise redirect
    res.redirect("back");
  }
};

//another middleware to check if the user is authorized to edit comments

middleware.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          return next();

        } else {
          //otherwise redirect
          res.redirect("back");
        }
      }

    });
  } else {
    //otherwise redirect
    res.redirect("back");
  }
};

module.exports=middleware;
