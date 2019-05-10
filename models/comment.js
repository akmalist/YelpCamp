/*jshint esversion:6 */

const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);
