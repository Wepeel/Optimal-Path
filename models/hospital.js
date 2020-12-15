const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const hospitalSchema = new Schema(
{
    name:
    {
        type: String,
        required: true
    },

    long:
    {
        type: Number,
        required: true
    },

    latitude:
    {
        type: Number,
        required: true
    },

    cardiology:
    {
        type: Boolean,
        required: true
    },

    neurology:
    {
        type: Boolean,
        required: true
    }


}, { timestamps: true });

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;