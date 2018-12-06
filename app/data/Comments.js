// This middleware implements the Mongoose schema

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const commentSchema = new Schema(
{
    headline:
    {   type:     String,
        required: true
    },
    comment:
    {   type:     String,
    }
})

var Comment = mongoose.model("Comment", commentSchema);

// Export the Comment model
module.exports = Comment;
