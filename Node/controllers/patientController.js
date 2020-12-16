const Patient = require('../models/patient')

const patient_index_get = async (req, res)=>
{
    try
    {
        let result = await Patient.find().sort({ createdAt: -1 })
        res.render('index', { patients: result, title: 'All patients' });
    }
    catch(err)
    {
      console.log(err);
    };
};

const patient_info_get = async (req, res)=>
{
    const id = req.params.id;
    try 
    {
        let result = await Patient.findById(id);
        res.render('patient', {patient: result, title: 'Patient Info'});
    }
    catch(err)
    {
        console.log(err);
        res.render('404', {title: "Couldn't find patient"});
    };
};

const patient_index_post = async (req, res)=>
{
    const patient = new Patient(req.body);
    try
    {
        await patient.save();
          res.redirect('/patients');
    }
    catch(err)
    {
          res.send("BAD");
    }
};

const patient_index_delete = async (req, res)=>
{
    const id = req.params.id;
    try
    {
        await Patient.findByIdAndDelete(id);
        res.redirect('/patients');
    }
  
    catch(err)
    {
      console.log(err);
    }
};

const patient_index_put = async (req, res)=>
{
    const id = req.params.id;
    try
    {
        var patient = await Patient.findById(id);
        patient.set(req.body);
        await patient.save();
        res.redirect('/patients');
    }
  
    catch(err)
    {
      console.log(err);
    }
}

module.exports =
{
    patient_index_get,
    patient_index_post,
    patient_index_delete,
    patient_info_get,
    patient_index_put
}