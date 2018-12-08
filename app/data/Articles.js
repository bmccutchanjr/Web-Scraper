// This middleware implements the Mongoose schema

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const articleSchema = new Schema(
{
    headline:
    {   type:     String,
        required: true
    },
    link:
    {   type:     String,
    },
    href:
    {   type:     String,
    },
    meta:
    {   type:     String,
    },
    img:
    {   type:     String,
    },
    comment:
    [   {   type:   Schema.Types.ObjectId,
            ref:    "Comment"
        }
    ]
})

var Article = mongoose.model("Article", articleSchema);

// Export the Article model
module.exports = Article;
