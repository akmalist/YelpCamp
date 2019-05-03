//create a schema
/*jshint esversion:6 */
const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

//create a module

module.exports = mongoose.model("Campground", campgroundSchema);
