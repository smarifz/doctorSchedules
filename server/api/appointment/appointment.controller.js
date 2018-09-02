'use strict'

const AppointmentModel = require('./appointment.model.js')

/** ***********
 * CRUD *
 **************/
// Get appointments
let getAllAppointments = async function (req, res) {
  try {
    const Appointment = new AppointmentModel('notable') //multi - tenant
    res.send(await Appointment.find({doctorId: req.params.doctorId}))
  } catch (e) {
    handleError(res, e.message)
  }
}

// Add appointments
let addAppointment = async function (req, res) {
  try {
    const Appointment = new AppointmentModel('notable') //multi - tenant

    let timeObj = new Date('Sun Sep 02 2018 15:15:06 GMT-0700')
    let minutesRequest = timeObj.getMinutes() // get minutes

    if ((minutesRequest == '0') || (minutesRequest == '15') || (minutesRequest == '30') || (minutesRequest == '45')) {

      // let intervalOccurenceOfTime = await Appointment.find({time: Date.now()});
      let intervalOccurenceOfTime = await Appointment.find({date: timeObj.toString()})

      let result = await Appointment.create({
        doctorId: req.body.doctorId,
        patientFirstName: req.body.patientFirstName,
        patientLastName: req.body.patientLastName,
        date: timeObj.toString(),
        kind: req.body.kind,
        itervalOccurence: intervalOccurenceOfTime.length > 0 ? intervalOccurenceOfTime.length++: 1,
      })

      res.send(result)
    } else {
      return handleError(res, `New appointments can only start at 15 minute intervals (ie, 8:15AM is a valid time but 8:20AM is not)`)
    }
  } catch (e) {
    handleError(res, e.message)
  }
}

// Delete appointment
let deleteAppointment = async function (req, res) {
  try {
    const Appointment = new AppointmentModel('notable') //multi - tenant
    res.send(await Appointment.remove({_id: req.params.appointmentId}))
  } catch (e) {
    handleError(res, e.message)
  }
}

// Get key
let seedAppointment = async function (req, res) {
  try {

    const Appointment = new AppointmentModel('notable') //multi - tenant
    let today = new Date(Date.now())
    let day = today.getDay()

    await Appointment.create({
      doctorId: '5b8c49f3ef4efb4f01a4d2b5',
      patientFirstName: 'New',
      patientLastName: 'Sick',
      day: day,
      date: 'Sun Sep 02 2018 15:15:06 GMT-0700',
      kind: 'new',
    })

    await Appointment.create({
      doctorId: '5b8c49f3ef4efb4f01a4d2b5',
      patientFirstName: 'Follow',
      patientLastName: 'Sick',
      day: day,
      date: 'Sun Sep 02 2018 15:15:06 GMT-0700',
      kind: 'follow-up',
    })

    res.send(await Appointment.find())

  } catch (e) {
    handleError(res, e.message)
  }
}

module.exports = {
  getAllAppointments,
  addAppointment,
  deleteAppointment,
  seedAppointment
}

function handleError (res, err) {
  return res.send(500, err)
}
