const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
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
        type: String,
        required: true
    },

    department:
    {
        type: String,
        required: true
    }

}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;