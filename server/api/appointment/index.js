'use strict';

const express = require('express');
const controller = require('./appointment.controller.js');
const router = express.Router();
const config = require('../../config/environment');

router.get('/all/:doctorId', controller.getAllAppointments);
router.post('/add', controller.addAppointment);
router.put('/delete/:appointmentId', controller.deleteAppointment);
router.get('/seed', controller.seedAppointment);

module.exports = router;
