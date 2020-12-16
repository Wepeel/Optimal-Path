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
        for ({_id, name, longitude, latitude} of temp_hospitals)
        {
            hospitals.push({_id, name, longitude,latitude});
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

const get_viable_hospitals = async (req, res)=>
{
    let radius = 15;
    let location = req.body.location;
    let department = req.body.department;
    let viable_hospitals = [];
    await Promise.all(hospitals.map(async (hosp)=>
    {
        if (await Doctor.exists({department:department, hospital:hosp._id}))
        // If there is a doctor that matches the needed hospital and criteria
        {
            if (Math.floor(get_distance(hosp, location)/1000) <= radius)
            {
                viable_hospitals.push(hosp);
            }
        }
    }));


    res.send(viable_hospitals)
    return viable_hospitals;
}

module.exports = 
{
    initialize_db_connection,
    get_viable_hospitals
};