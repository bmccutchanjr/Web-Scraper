// This middleware implements the Mongoose schema

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const commentSchema = new Schema(
{
    name:
    {   type:     String,
        required: true
    },
    comment:
    {   type:     String,
        required: true
    }
})

var Comment = mongoose.model("Comment", commentSchema);

// Export the Comment model
module.exports = Comment;
