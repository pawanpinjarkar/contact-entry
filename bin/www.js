/* eslint-disable no-unused-vars */
/**
 * Express Server
 * ./bin/www.js
 *
 */

const express = require('express');
const bodyParser = require('body-parser');
const validate = require('express-validation');
const ensureCtype = require('express-ensure-ctype');
const contactEntry = require('../contact-entry.js');

const ensureJson = ensureCtype('json');

validate.options({
  allowUnknownBody: false,
  allowUnknownHeaders: false,
  allowUnknownCookies: false,
});

const validation = require('../lib/validation');

const app = express();

/**
 * Parse the port integer
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
   * Listen on provided port, on all network interfaces.
   */
const server = app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')} press CTRL+C to terminate.`);
});
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

app.on('error', onError);
app.on('listening', onListening);

app.use(bodyParser.json()); // for parsing application/json

/**
 * APIs
 */
app.get('/contacts', contactEntry.listAllContacts);
app.post('/contacts', ensureJson, validate(validation.contactEntry), contactEntry.createContact);
app.put('/contacts/:id', ensureJson, validate(validation.contactEntry), contactEntry.updateContact);
app.get('/contacts/:id', contactEntry.getSpecificContact);
app.delete('/contacts/:id', contactEntry.deleteContact);

// error handler for express-validaiton
// this error handling middleware has to be defined after all the routes have been defined,
// otherwise, it won't work.
// Express error-handling functions have four arguments (err, req, res, next)
// so do not remove 'next' param even if eslint complains about no-unused-vars

app.use((err, req, res, next) => {
  // specific for validation errors
  if (err instanceof validate.ValidationError) {
    return res.status(err.status).json(err);
  }
  return res.status(500);
});

//  Shutdown process
//  this function is called when you want the server to die gracefully
//  i.e. wait for existing connections
const shutdownServer = function () {
  let msg = 'Received kill signal, shutting down server...';
  console.log(msg);
  server.close(() => {
    msg = 'Closed out remaining connections.';
    console.log(msg);
    process.exit();
  });

  // if after 10 seconds, force shutdown
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit();
  }, 10 * 1000);
};

// listen for TERM signal .e.g. kill
process.on('SIGTERM', shutdownServer);
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', shutdownServer);
// catches uncaught exceptions
process.on('uncaughtException', shutdownServer);
