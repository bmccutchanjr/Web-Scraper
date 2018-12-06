// scrapedb.js id the middleware responsible for getting data into and out of the database.

// require the dependencies
const chalk = require("chalk");
const db = require ("./db.js");

// const articles = [];

const scrapeDb =
{
    getAllArticles: function()
    {   // get all of the articles in the database

        // no database at the moment.  The articles are an array of objects...

        return new Promise ((resolve, reject) =>
        {
            // if (articles) resolve(articles)
            db.Article
            .find()
            .then(function(data)
            {   resolve(data)
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

        // no database at the moment.  The articles are in an array of objects
        var found = articles.find(function(article)
        {   // don't want to duplicate articles in the database, so search the database for the headline

            return headline === article.headline 
        })

        if (!found)
        {   // I only want to add new articles to the database.

            // articles.push(
            //     {   headline,
            //         link,
            //         href,
            //         img,
            //         meta
            //     })
            db.Article.create(
            {   headline,
                link,
                href,
                img,
                meta
            })
        }
    }
}

module.exports = scrapeDb;
