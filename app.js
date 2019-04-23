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




app.get("/",function(req,res){
  res.render("landing");
});


app.get("/campgrounds", function(req, res) {
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
    }

  ];

  res.render("campground", {
    campgrounds: campgrounds
  });

});

app.listen(3000, function() {
  console.log("App is running on port 3000");
});
