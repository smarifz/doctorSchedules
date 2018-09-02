'use strict';

const express = require('express');
const controller = require('./doctor.controller.js');
const router = express.Router();
const config = require('../../config/environment');

router.get('/all', controller.getAllDoctors);
router.get('/seed', controller.seedDoctors);

module.exports = router;
