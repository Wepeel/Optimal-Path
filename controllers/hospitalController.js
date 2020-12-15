const Hospital = require('../models/hospital');
const fs = require('fs');

const hospitals;

const initialize_db_connection = async ()=>
{

    const dbUri = "mongodb+srv://wepeel:test1234@patients.bdv4e.mongodb.net/patients?retryWrites=true&w=majority";
    try
    {
        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    catch(err)
    {
        console.log(err);
    }
}


const get_nearest_hospital = (req, res)=>
{

}