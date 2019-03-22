const HTTP = require('http');
const HOST = "localhost";
const PORT = process.env.PORT || "6660";
const APP = require('./app');

const server = HTTP.createServer(APP);
server.listen(PORT);