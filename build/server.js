"use strict";

require('babel-polyfill');

var app = require('./app');

var debug = require('debug')('api:server');

var http = require('http');

require('dotenv').config();
/**
 * Normalize a port into a number, string, or false.
 */


var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};
/**
 * Get port from environment and store in Express.
 */


var port = normalizePort(process.env.SERVER_POST || '3000');
app.set('port', port);
/**
 * Event listener for HTTP server "error" event.
 */

var onError = function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
};
/**
 * Create HTTP server.
 */


var server = http.createServer(app);
/**
 * Event listener for HTTP server "listening" event.
 */

var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
};
/**
 * Listen on provided port, on all network interfaces.
 */


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);