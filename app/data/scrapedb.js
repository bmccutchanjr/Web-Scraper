// scrapeDb.js id the middleware responsible for getting data into and out of the database.

// require the dependencies
const chalk = require("chalk");
const db = require ("./db.js");

const scrapeDb =
{
    getAllArticles: function()
    {   // get all of the articles in the database

        // no database at the moment.  The articles are an array of objects...

        return new Promise ((resolve, reject) =>
        {
            db.Article
            .find()
            .then(function(data)
            {   
                resolve(data)
            })
            .catch(function(error)
            {   reject(error)
            })
        })
    },

    addNewArticle: function(headline, link, href, meta, img)
    {   // add an article to the database

        // I could use rest operator in the parameter list, but naming each of them makes their purpose more
        // apparent

        const found = db.Article.find({ headline: headline })

        db.Article.create(
        {   headline,
            link,
            href,
            img,
            meta
        })
    },

    getOneArticle: function(id)
    {   // add an article to the database

        return new Promise ((resolve, reject) =>
        {   const data = db.Article.find({ _id: id })
            .populate("comment")
            .then(function(data)
            {   resolve(data)
            }) 
            .catch(function(error)
            {   reject(error)
            })
        })
    },

    addComment: function(id, data)
    {   // add an comment for the indicated article

        return new Promise ((resolve, reject) =>
        {   db.Comment.create(data)
            .then(function(dbComment)
            {                
                resolve (db.Article.findOneAndUpdate({ _id: id }, { $push: { comment: dbComment._id }}, { new: true }))
            })
            .catch(function(error)
            {
                reject (error)
            })
        })
    }
}

module.exports = scrapeDb;
