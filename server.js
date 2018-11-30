// Require the dependencies
const express = require('express');
const apiRoutes = require ("./app/routes/api.js")
const htmlRoutes = require ("./app/routes/html.js")

// Configure ExpressJS
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Set the PORT to be used by the server.  If the Node.js process environment has a variable defined called
// PORT, this application is likely deployed on Heroku and it must use the server must use the port specified
// by Heroku.  If the process environment does not have a PORT variable defined it is probably running locally
// and can use pretty much whatever port I want.

const PORT = process.env.PORT || 8080;
app.listen(PORT, function()
{   // Start the server
    console.log("server listening on :", PORT);
});
