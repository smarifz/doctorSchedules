#Notable

#Doctor API

####To run application:
  npm install
   
  node server/app.js -e local

    Note: You will need to install Mongo DB locally.

####Get a list of all doctors
  First seed Doctors and then call API
  
  -Seed: GET http://localhost:9119/api/doctor/seed
  
  -Get All Doctors: GET http://localhost:9119/api/doctor/all


####Get a list of all appointments for a particular doctor and particular day
  First seed Appointments and then call API
  
  -Seed: GET http://localhost:9119/api/appointment/seed
  
  -Get All Appointments based on Doctor ID: GET http://localhost:9119/api/appointment/all/:doctorID 
  
  Ex: http://localhost:9119/api/appointment/all/5b8c49f3ef4efb4f01a4d2b5
  
    Note: Doctor ID is an ObjectID of a document in "Doctors" collection in Mongo DB. You'll have to manually retrieve it. I was unable to implement the 
    Days requirement due to time restriction but I was able to find Moment.js lib which has great API to get this done. 

  
  
####Delete an existing appointment from a doctor's calendar
  
  First seed Appointments (if you haven't done it already) and then call API
  
  -Seed: GET http://localhost:9119/api/appointment/seed
  
  -Delete appointment: http://localhost:9119/api/appointment/delete/:appointmentId
  
  Ex: http://localhost:9119/api/appointment/delete/5b8c65333004c0513f2566d8

  
    Notes: Appointment ID is an ObjectID of a document in "Appointment" collection in Mongo DB. You'll have to manually retrieve it.


####Add a new appointment to a doctor's calendar

  -Add: POST http://localhost:9119/api/appointment/add
  
  JSON Body sample: {      
                     "doctorId": "5b8c49f3ef4efb4f01a4d2b5",
                      "patientFirstName": "Jax",
                      "patientLastName": "Teller",
                      "kind": "new"
                    }
                    
   Time interval restrictions are set to the value of 3 done by Mongoose's validation methods. Appointments with the same 
   doctor in the same time interval can be added at most 3 times. After 3, a validation error is returned. 
   
      
    Notes: There is a better way of checking the 15 minute interval but I implemented a brute force method due to time restrictions.
