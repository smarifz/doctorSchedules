/**
 * Main application file
 */

'use strict'

const argv = require('minimist')(process.argv.slice(2))

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || argv.e || 'development'
process.env.NODE_APP_INSTANCE = process.env.NODE_APP_INSTANCE || argv.i || 'notable'
require('events').EventEmitter.defaultMaxListeners = Infinity

const express = require('express')
const config = require('./config/environment')
const helmet = require('helmet')

// Setup server
const app = express()
const server = require('http').createServer(app)
// require('./config/acl'); // Access control list
// require('./config/passport')(app); // Authentication setup
require('./config/express')(app) // Web framework setup

require('./routes')(app) // Managing routes

// Securities
app.use(helmet())

// Start server
server.timeout = 0
server.listen(config.port, function (error) {
  if (error) {
    log.error(error)
    return process.exit(1)
  } else {
    // debug('Database server running on %s listening on %s, in %s mode as %s', config.hostname, config.port, app.get('env'), process.env.NODE_APP_INSTANCE);
    console.log('Notable server running on %s listening on %s, in %s mode as %s', config.hostname, config.port, app.get('env'), process.env.NODE_APP_INSTANCE)
  }
})

// Expose app
exports = module.exports = app
