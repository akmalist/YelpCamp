/*jshint esversion:6 */

const express = require("express");
const router = express.Router({mergeParams:true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
// ========================
// Comments routes
// ========================

//////Comments new show/////
router.get("/new", isLogedin, function(req,res){
    // find Campground by id and render comments
    Campground.findById(req.params.id, function(err, campground){
      if(err){
        console.log(err);
      }else{
          res.render("comments/new",{campground:campground});
      }
    });

});



//// comments Create//////
router.post("/", isLogedin, function(req, res){
 Campground.findById(req.params.id, function(err, campground){
   if(err){
     console.log(err);
     res.redirect("/campgrounds");
   }else{
     Comment.create(req.body.comment, function(err, comment){
       if(err){
         console.log(err);
       }else{
         comment.author.id= req.user._id;
         comment.author.username = req.user.username;
         //save comments
         comment.save();
         campground.comments.push(comment);
         campground.save();
         res.redirect("/campgrounds/" +campground._id);
       }
     });
   }
 });
});



//middleware////
// check if the user is logedin
function isLogedin(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
