// html.js is the middleware for the static routes and their auxillary files.  Since the default route
// (/index.html) is actually an express-handlebars view, this module also handles it. 

// Require the dependencies
const chalk = require("chalk");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const scrapeDb = require("../data/scrapedb.js");

// Configure ExpressJS
const app = express();
const router = express.Router ();
app.use ("/", router);

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/NewsScraper");
const mongoURI = "mongodb://localhost/NewsScraper";

if (process.env.MONGODB_URI)
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    // mongoose.connect("mongodb://heroku_ggpvrzhg:heroku_ggpvrzhg@ds229474.mlab.com:29474/heroku_ggpvrzhg", { useNewUrlParser: true })
else
    mongoose.connect(mongoURI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", function(error)
{   console.log(chalk.red("Mongoose Error: ", error))
})

db.once("open", function()
{   console.log("Mongoose has connected to the MongoDB server")
})

router
.use (function (request, response, next)
{   // This always happens always happens whenever any route is served in this module.  At the moment
    // I use it to debug routes, but it could be something more useful.

    console.log(chalk.blue("html.js"));
    console.log(chalk.blue("requesting: ", request.url));
    next();
})
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
.use(express.static(path.join(__dirname, "../public")))
.use(function (request, response)
{   // handle 404 errors
    response.sendFile(path.join(__dirname, "../public/404.html"));
});

module.exports = router;
