const Hospital = require('../models/hospital');
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


const get_nearest_hospital = (req, res)=>
{

}

module.exports = 
{
    initialize_db_connection
};