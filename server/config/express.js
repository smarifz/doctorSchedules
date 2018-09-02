/**
 * Express configuration
 */

'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const config = require('./environment');

module.exports = (app) => {
    const env = app.get('env');
    app.set('views', config.root + '/server/public/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'jade');
    app.use(compression());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(bodyParser.json({ limit: '150mb' })); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.set('trust proxy', true);
    app.set('trust proxy', 'loopback');
};
