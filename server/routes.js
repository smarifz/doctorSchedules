/**
 * Main application routes
 */

'use strict';

module.exports = function (app) {
  const errors = require('./components/errors');
  const config = require('./config/environment/index.js');

  const Doctor = require('./api/doctor');
  const Appointment = require('./api/appointment');

  // //LOGGING ALL HTTP REQUESTS
  app.use('/', function(req,res,next){
   console.log(req.path);
   next(); // pass control to the next handler
  });

  app.use('/api/doctor', Doctor);
  app.use('/api/appointment', Appointment);


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendfile('client/dist/index.html', { root: config.root });
  });
};
