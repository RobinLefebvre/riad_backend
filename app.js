// Routes are just a fancy way of injecting require()
const routes = [];
routes.push( {name : '/users', ref : require("./server/routes/users") } );

const express = require('express');
const LOG = require('morgan');
const R_PARSER = require('body-parser');
const C_PARSER = require('cookie-parser');
const UTIL = require('./util');
const APP = express();


// Every request passes throught Logging for now.
APP.use(LOG(':method request on URL : :url \\nStatus :status \\nSize :res[content-length] bytes \\nTime : :response-time ms')); 
// POST requests pass through Parsing
APP.use(R_PARSER.urlencoded({extended : false}));
// POST requests pass through Parsing
APP.use(R_PARSER.text({type: 'text/plain', limit: '5gb'})); 
// POST requests pass through Parsing
APP.use(R_PARSER.json({limit: '5gb'}));
// We parse cookies for every request
APP.use(C_PARSER());
// Manage CORS errors
APP.use(UTIL.cors_handler); 

// Handle the request in one of the defined routes
routes.forEach( (route) => 
{
    APP.use(route.name, route.ref);
})

// Handle 404 errors when route isn't valid
APP.use(UTIL.error_404_handler); 

// Handle other thrown errors
APP.use(UTIL.error_handler) 

module.exports = APP;