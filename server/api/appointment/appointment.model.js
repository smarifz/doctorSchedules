'use strict'
/*
 Appointment ORM Model
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema
var config = require('../../config/environment')
var conn = require('../../config/mongodb')

function AppointmentModel (dbname) {
  var db = conn.useDb(dbname) // use another database without creating additional connections

  var AppointmentSchema = new Schema({
    appointmentId: Schema.Types.ObjectId,
    doctorId: Schema.Types.ObjectId,
    patientFirstName: String,
    patientLastName: String,
    day: { type : Date },
    date: Schema.Types.Date,
    time : { type : Date },
    kind: String,
    itervalOccurence: { type: Number, max: 3},
  })

  try {
    return db.model('Appointments', AppointmentSchema)
  } catch (error) {
    return db.model('Appointments')
  }
}

module.exports = AppointmentModel

