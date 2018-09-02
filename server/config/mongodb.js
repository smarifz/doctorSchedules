/**
 * Created by arifzaidi on 4/27/16.
 */
'use strict';

var mongoose = require('mongoose');
var config = require('./environment');
require('events').EventEmitter.defaultMaxListeners = 100;


// Todo - refactor so that simple360 db is accessed like a tenant
// For simple360 DB - special case
mongoose.connect(config.mongo.uri, config.mongo.options, function(err) {
	if (err) {
		console.log('Error with main db. Details: ', err);
		process.exit();
	}
});

// For creating connections for accessing tenant db
var mongodbConnection = mongoose.createConnection(config.mongo.uri, config.mongo.tenantdb.options);
mongodbConnection.once('open', function(err, data) {
	console.log('Database (Mongo) connected.');
});

mongodbConnection.once('disconnect', function(err, data) {
	console.log('Database (Mongo) disconnected!', err);
});

mongodbConnection.once('error', function(err, data) {
	console.log('Database (Mongo) error! Details:', err);
});

module.exports = mongodbConnection;
