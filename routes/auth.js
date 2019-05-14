/*jshint esversion:6 */


const express = require("express");
const router = express.Router();
const passport =require("passport");
const User = require("../models/user");
// ========================
// Authentication routes
// ========================


////root route////
router.get("/", function(req, res) {
  res.render("landing");
});


//******************* Passport registration request***********************//


//show register form

router.get("/register", function(req,res){
  res.render("register");
});


//handles sign up logic route
router.post("/register", function(req,res){
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
//show login form
router.get("/login", function(req,res){
  res.render("login");

});

//handles login form
router.post("/login", passport.authenticate("local",
{
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res){
});


///log out route

router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/campgrounds");
});


//middleware
// check if the user is logedin
function isLogedin(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
