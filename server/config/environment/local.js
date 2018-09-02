'use strict'
let fs = require('fs')

let mongoConfig = {
  uri: 'mongodb://localhost/',
  main: 'notable',
  ssl: false,
  // full_uri: this.uri+ this.main+'?ssl='+this.ssl,
  getFullUri: function () {
    return this.uri + this.main
  },
}

// Local specific configuration
// ==================================
let config = {

  ip: 'localhost',

  hostname: 'localhost',

  // MongoDB connection options
  mongo: {
    uri: mongoConfig.getFullUri(),
  },


}

module.exports = config
