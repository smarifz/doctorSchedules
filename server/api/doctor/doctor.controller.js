'use strict';

const DoctorModel = require ('./doctor.model.js');

/** ***********
 * CRUD *
 **************/
// Get key
let getAllDoctors = async function(req, res) {
  try {

    const Doctor = new DoctorModel ('notable'); //multi - tenant
    res.send(await Doctor.find());

  } catch (e) {
    handleError(res, e.message);
  }
};

let seedDoctors = async function(req, res) {
  try {

    const Doctor = new DoctorModel ('notable'); //multi - tenant
    res.send(await Doctor.create({ firstName: 'Bob', lastName: 'Thomos' })) // for seed purpose);

  } catch (e) {
    handleError(res, e.message);
  }
};



module.exports = {
  getAllDoctors,
  seedDoctors
};

function handleError(res, err) {
  return res.send(500, err);
}
