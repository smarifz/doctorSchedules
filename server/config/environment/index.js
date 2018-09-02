'use strict';

var path = require('path');
var _ = require('lodash');
var fs = require('fs');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // ip:  process.env.OPENSHIFT_NODEJS_IP ||
    //     process.env.IP ||
    //	 undefined,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    port: 9119,

    // MongoDB connection options
    mongo: {
        tenantdb: {
            options: {
                user: '',
                pass: '',
                auth: {
                    authdb: 'admin',
                },
            },
        },
        ata: {
            options: {
                user: '',
                pass: '',
                db: {
                    safe: true,
                },
                keepAlive: true,
            },
        },
    },


};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('../instance/' + process.env.NODE_APP_INSTANCE + '.js') || {},
    require('./' + process.env.NODE_ENV + '.js') || {});
