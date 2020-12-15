const Patient = require('../models/patient')

const patient_index_get = (req, res)=>
{
    Patient.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { patients: result, title: 'All patients' });
    })
    .catch(err => {
      console.log(err);
    });
};

const patient_info_get = (req, res)=>
{
    const id = req.params.id;
    Patient.findById(id)
        .then(result=> {
                res.render('patient', {patient: result, title: 'Patient Info'});
        })
        .catch(err =>{
            console.log(err);
            res.render('404', {title: "Couldn't find patient"});
        });
};

const patient_index_post = (req, res)=>
{
    const patient = new Patient(req.body);
    patient.save()
        .then(result=>{
            res.redirect('/patients');
        })
        .catch(err=>{
            //console.log("Now request");
            console.log(req.body);
            res.send("BAD");
        });
};

const patient_index_delete = (req, res)=>
{
    const id = req.params.id;
    Patient.findByIdAndDelete(id)
    .then(result => {
      res.redirect('/patients');
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports =
{
    patient_index_get,
    patient_index_post,
    patient_index_delete,
    patient_info_get
}