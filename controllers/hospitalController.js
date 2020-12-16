const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');
const mongoose = require('mongoose');

var hospitals;

const get_distance = (loc1, loc2)=>
{
    const lon1 = loc1.longitude, lon2 = loc2.longitude;
    const lat1 = loc1.latitude, lat2 = loc2.latitude;

    const R = 6371e3; // metres
    const phi1 = lat1 * Math.PI/180;
    const phi2 = lat2 * Math.PI/180;
    const delta_phi = (lat2-lat1) * Math.PI/180;
    const delta_lambda = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(delta_phi/2) * Math.sin(delta_phi/2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(delta_lambda/2) * Math.sin(delta_lambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in metres
}

const initialize_db_connection = async ()=>
{

    const dbUri = "mongodb+srv://wepeel:test1234@patients.bdv4e.mongodb.net/patients?retryWrites=true&w=majority";
    try
    {
        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        var temp_hospitals = await Hospital.find({});
        hospitals = [];
        for ({longitude: longitude, latitude: latitude} of temp_hospitals)
        {
            hospitals.push({longitude,latitude});
        }
        console.log(hospitals);
        console.log("Distance: ", hospitals[1], hospitals[2], get_distance(hospitals[1],hospitals[2]) / 1000);
    }
    catch(err)
    {
        console.log(err);
    }
}

const get_viable_hospitals = async (req, res)=>
{
    let radius = 50;
    location = req.body.location;
    department = req.body.department;
    let viable_hospitals = [];
    hospitals.forEach(async (hosp)=>
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
            if (Math.floor(get_distance(hosp, location)/1000) <= radius)
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