// html.js is the middleware for the static routes and their auxillary files.  Since the default route
// (/index.html) is actually an express-handlebars view, this module also handles it. 

// Require the dependencies
const chalk = require("chalk");
const express = require("express");
// const handlebars = require("express-handlebars");
const path = require("path");
const scrapeDb = require("../data/scrapeDb.js");

// Configure ExpressJS
const app = express();
const router = express.Router ();
app.use ("/", router);

// Configure Express-Handlebars
// app.engine("handlebars", handlebars({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");


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
console.log(chalk.yellow(data))
        response.render("index", data);
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
