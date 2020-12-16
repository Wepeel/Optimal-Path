const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const hospitalSchema = new Schema(
{
    name:
    {
        type: String,
        required: true
    },

    longitude:
    {
        type: Number,
        required: true
    },

    latitude:
    {
        type: Number,
        required: true
    },

    load_percentage:
    {
        type: Number,
        required: true
    }

}, { timestamps: true });

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;