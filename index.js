require('dotenv').config();
// Imorting the Express framework module into the 'express' variable.
const express = require('express');
// creating an instance of the express application by calling the express() function and assigning it to expressInstance variable.
const expressInstance = express();
// Importing express-ejs-layouts module into the layoutsModule variable.
const layoutsModule = require('express-ejs-layouts');

// Defining port number
const gateWay = 4000;

// Middleware function to parse incoming requests with urlencoded payloads.
// extended set to true allows parsing of rich objects and arrays.
expressInstance.use(express.urlencoded({extended:true}));

// serving static files from a directory by using express built-in middleware.
expressInstance.use(express.static('./assets'));
// applying express-ejs-layouts middleware in the express application for layout support.
expressInstance.use(layoutsModule);
// Importing database configuration module
const dataBase = require('./config/mongoose.js');

//Enabling the automatic extraction of styles and scripts from views to include them in the layout file in express.js using express-ejs-layout middleware.
expressInstance.set('layout extractStyles', 'true');
expressInstance.set('layout extractScripts', 'true');

//Setting up EJS as view engine for rendering dynamic content in Express.js.
expressInstance.set('view engine', 'ejs');

//Setting up directory where express.js will look for view templates.
expressInstance.set('views', './views');

//Registering a route handler for the root URL in the Express.js application, directing requests to the specified index router module.
expressInstance.use('/', require('./routes/index.js'));

// This code starting express server on the specified port.
expressInstance.listen(gateWay, function(error){
    if(error){
        console.log(`Error in running the server - ${error}`);
    }

    console.log(`Server is running on port: ${gateWay}`);
});