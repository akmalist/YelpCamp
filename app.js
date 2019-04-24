/*jshint esversion:6 */
const express = require("express");
const app =express();
const ejs =require("ejs");
const bodyParser = require("body-parser");
const request =require("request");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));



//initial data

const campgrounds = [{
    name: "Salmon Creek",
    image: "images/salmonCreek.JPG"
  },
  {
    name: "Granite Hill",
    image: "images/graniteHill.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image: "images/mountainGoat.jpg"
  },
  {
  name: "Salmon Creek",
  image: "images/salmonCreek.JPG"
},
{
  name: "Granite Hill",
  image: "images/graniteHill.jpg"
},
{
  name: "Mountain Goat's Rest",
  image: "images/mountainGoat.jpg"
},
{
  name: "Mountain Goat's Rest",
  image: "images/mountainGoat.jpg"
},
{
  name: "Mountain Goat's Rest",
  image: "images/mountainGoat.jpg"
}




];


app.get("/",function(req,res){
  res.render("landing");
});


app.get("/campgrounds", function(req, res) {

  res.render("campground", {
    campgrounds: campgrounds
  });

});


app.post("/campgrounds", function(req,res){
  //requesting data from post input
  const name= req.body.campName;
  const image =req.body.image;
  const userData = {
    name: name,
    image: image
  };

  campgrounds.push(userData);

  res.redirect("campgrounds");
});


app.get("/campgrounds/new", function(req,res){
  res.render("new");
});

app.listen(3000, function() {
  console.log("App is running on port 3000");
});
