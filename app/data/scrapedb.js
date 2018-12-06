// scrapedb.js id the middleware responsible for getting data into and out of the database.

// require the dependencies
// right now there are none...
const chalk = require("chalk");

const articles = [];

const scrapeDb =
{
//     getAllArticles: function(callback)
//     {   // get all of the articles in the database
// // console.log(chalk.magenta("articles: ", articles));
//
//         // no database at the moment.  The articles are an array of objects...
//
//         callback(articles);
//     },
    getAllArticles: function()
    {   // get all of the articles in the database
// console.log(chalk.magenta("articles: ", articles));

        // no database at the moment.  The articles are an array of objects...

        return new Promise ((resolve, reject) =>
        {
// console.log(chalk.magenta("resolving Promise"));
            if (articles) resolve(articles)
            reject(new Error ("Unspecified error occured"))
        })
    },

    addNewArticle: function(headline, link, href, meta, img)
    {   // add an article to the database
// console.log(chalk.magenta("addNewArticle"));

        // I could use rest operator in the parameter list, but naming each of them makes their purpose more
        // apparent

        // no database at the moment.  The articles are in an array of objects
        var found = articles.find(function(article)
        {   // don't want to duplicate articles in the database, so search the database for the headline

            return headline === article.headline 
        })

        if (!found)
        {   // I only want to add new articles to the database.

            articles.push(
                {   headline,
                    link,
                    href,
                    img,
                    meta
                })
// console.log(chalk.magenta("articles: ", articles));
        }
    }
}

module.exports = scrapeDb;
