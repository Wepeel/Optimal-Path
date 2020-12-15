const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');
const mongoose = require('mongoose');

var hospitals;

const initialize_db_connection = async ()=>
{

    const dbUri = "mongodb+srv://wepeel:test1234@patients.bdv4e.mongodb.net/patients?retryWrites=true&w=majority";
    try
    {
        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        var temp_hospitals = await Hospital.find({});
        hospitals = [];
        for ({long: long, latitude: latitude} of temp_hospitals)
        {
            hospitals.push({long,latitude});
        }
        console.log(hospitals)
    }
    catch(err)
    {
        console.log(err);
    }
}

const get_distance = (loc1, loc2)=>
{
    return Math.sqrt(
        (Math.pow(loc1.long - loc2.long), 2)
        (Math.pow(loc1.latitude - loc2.latitude), 2)
        )
}

const get_viable_hospitals = async (req, res)=>
{
    let radius = 50;
    location = req.body.location;
    department = req.body.department;
    let viable_hospitals = [];
    hospitals.forEach(hosp=>
    {
        let doctors = await Doctor.find({});
        if(
        doctors.includes(doc=>
        {
            return doc.hospital == hosp.name && doc.department == department;
        })
        )
        // If there is a doctor that matches the needed hospital and criteria
        {
            if (get_distance(hosp, location) <= radius)
            {
                viable_hospitals.push(hosp);
            }
        }
    });

    return viable_hospitals;
}

module.exports = 
{
    initialize_db_connection,
    get_viable_hospitals
};