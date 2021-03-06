// api.js is the handler for the API routes.

// Require the dependencies
const chalk = require("chalk");
const express = require("express");
const mongoose = require("mongoose");
const scrapeDb = require("../data/scrapedb.js");
const scrape = require("../data/scrape.js");

// Configure ExpressJS
const app = express();
const router = express.Router ();
app.use ("/", router);

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/NewsScraper", { useNewUrlParser: true });
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

    console.log(chalk.red("api.js"));
    console.log(chalk.red("requesting: ", request.url));
    next();
})
.get("/scrape", function(request, response)
{   // A GET request has been made for the /api/scrape endpoint

    scrape()
    .then (function()
    {
        response.status(200).send("OK");
    })
    .catch(function(error)
    {
        response.status(500).send(error);
    })
})
.get("/getOneArticle/:id", function(request, response)
{   // A GET request has been made for the /api/getOneComment endpoint

    scrapeDb.getOneArticle (request.params.id)
    .then(function(data)
    {
        response.status(200).json(data);
    })
    .catch(function(error)
    {
        response.status(500).send(error);
    })
})
.post("/addComment/:id", function(request, response)
{   // A POST request has been made for the /newComment endpoint.  Insert the comment in the database

    scrapeDb.addComment(request.params.id, request.body)
    .then(function(data)
    {
        response.status(200).send("comment was added");
    })
    .catch(function(error)
    {
        response.status(500).send(error);
    })
})

module.exports = router;
