'use strict'
/*
 Doctor ORM Model
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema
var config = require('../../config/environment')
var conn = require('../../config/mongodb')

function DoctorModel (dbname) {
  var db = conn.useDb(dbname) // use another database without creating additional connections

  var DoctorSchema = new Schema({
    doctorId: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,

  })

  try {
    return db.model('Doctors', DoctorSchema)
  } catch (error) {
    return db.model('Doctors')
  }
}

module.exports = DoctorModel

