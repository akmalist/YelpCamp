/*jshint esversion:6 */

const mongoose = require("mongoose");
const Campground =require("./models/campground");
const Comment   = require("./models/comment");

const data =[
  {
  name: "Jamdadrad wqda",
  image: "https://images.pexels.com/photos/2131774/pexels-photo-2131774.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  description: "bla bla bla",
},

{
name: "oipoip wqda",
image: "https://images.pexels.com/photos/2221149/pexels-photo-2221149.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
description: "bla bla bla",
},


{
name: "fyhhsf wqda",
image: "https://images.pexels.com/photos/2222452/pexels-photo-2222452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
description: "bla bla bla",
},

{
name: "adadadad wqda",
image: "https://images.pexels.com/photos/2214386/pexels-photo-2214386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
description: "bla bla bla",
},
{
     name: "Cloud's Rest",
     image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
 },
 {
     name: "Desert Mesa",
     image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
 },
 {
     name: "Canyon Floor",
     image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
 }



];



function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            // if(err){
            //     console.log(err);
            // }
            // console.log("removed comments!");
            //  //add a few campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //         if(err){
            //             console.log(err);
            //         } else {
            //             console.log("added a campground");
            //             //create a comment
            //             Comment.create(
            //                 {
            //                     text: "This place is great, but I wish there was internet",
            //                     author: "Homer"
            //                 }, function(err, comment){
            //                     if(err){
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("Created new comment");
            //                     }
            //                 });
            //         }
            //     });
            // });
        });
    });
    //add a few comments
}

module.exports = seedDB;
