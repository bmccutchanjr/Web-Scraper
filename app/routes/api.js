// api.js is the handler for the API routes.

// Require the dependencies
const chalk = require("chalk");
const express = require("express");
const model = require("..data/model.js");

// Configure ExpressJS
const app = express();
const router = express.Router ();
app.use ("/", router);

router
.use (function (request, response, next)
{   // This always happens always happens whenever any route is served in this module.  At the moment
    // I use it to debug routes, but it could be something more useful.

    console.log(chalk.red("api.js"));
    console.log(chalk.red("requesting: ", request.url));
    next();
})
.get("/some endpoint", function(request, response)
{   // A GET request has been made for some endpoint.  Respond with the appropriate data



//     model.method (request.params.data, function(status, data)
//     {   // serve data returned from the model
// 
//         if (status != 200)
//             response.status(status).send(data);
//         else
//             response.status(200).json(data);



})
.post("/some endpoint", function(request, response)
{   // A POST request has been made for some endpoint.  Respond with the appropriate data



//     model.method (request.body.data, function(status, data)
//     {   // serve data returned from the model
// 
//         if (status != 200)
//             response.status(status).send(data);
//         else
//             response.status(200).json(data);



})
.put("/some endpoint", function(request, response)
{   // A PUT request has been made for some endpoint.  Respond with the appropriate data



})
.delete("/some endpoint", function(request, response)
{   // A DELETE request has been made for some endpoint.  Respond with the appropriate data



})

module.exports = router;
