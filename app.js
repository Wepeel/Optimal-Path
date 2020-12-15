const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const patientsRoutes = require('./routes/patientsRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');

const app = express();



app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use('/patients', patientsRoutes);

app.get('/', (req, res)=>
{
    res.render('404', {title: '404'});
})