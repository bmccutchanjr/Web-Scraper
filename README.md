# Web-Scraper

CBS News Web Scraper is a full-stack web application built with Node.js.  It uses the Axios, Cheerios, Express, Express-Handlebars and Mongoose NPM modules to create and interact with a MongoDB database.  It is configured with a conventional C-V-M methodology.

You can try it out [here](https://bmccutchanjr-web-scraper.herokuapp.com) or check out the [video](coming soon).

![home page](/app/public/images/screenshot.png)

## Web Scraping

Web scraping is a technique of retrieving data not from web APIs. but from the same HTML file a browser would use to render a page.  In my case, I'm using Axios to retrieve the page at www.cbsnews.com and Cheerio to pull data from the source in the same way jQuery would be used to interact with the browser DOM.  Meta data is retrieved for the various articles on the CBS page and stored in a MongoDB database.  That same data is used to build links to the CBS articles using Express-Handlebars.

## The Database

The database schema is pretty simply, consisting of only two collections, Articles and Comments.  The Mongoose schema is used to maintain a relationship between the collections.

```
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
```
```
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
```

## Promises

Although the application uses a fairly conventional C-V-M methodology (there are several modules used to implement the routes, model and views) I used JavaScript Promises rather than callback functions to pass data between modules.  The Promises make the code easier to understand and maintain.

One example:

The function getAllArticles() resides in `/app/data/scrapedb.js` and retrieves all of the articles from the database.

```
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
```

The function is called by the default route ("/") in the routing module `html.js` 

```
    .get("/", function(request, response)
    {   // Load the home page...requires information from the database

        scrapeDb.getAllArticles()
        .then(function(data)
        {
            response.render("index", { news: data });
        })
        .catch(function(error)
        {
            response.status(500).json(error);
        });
    })
```