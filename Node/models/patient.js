const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const patientSchema = new Schema(
{
    first_name:
    {
        type: String,
        required: true
    },

    last_name:
    {
        type: String,
        required: true
    },

    hospital:
    {
        type: mongoose.ObjectId
    }

}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;