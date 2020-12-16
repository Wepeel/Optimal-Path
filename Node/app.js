const express = require('express');
const morgan = require('morgan');

const patientsRoutes = require('./routes/patientsRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const caseRoutes = require('./routes/caseRoutes');
const { initialize_db_connection } = require('./controllers/hospitalController');

const app = express();

initialize_db_connection()
    .then(()=>
    {
        app.listen(3000);
        console.log("App listening on port 3000");
    })
    .catch(result=>
        {
            console.log("Error connecting");
            console.log("Exiting...");
            return -1;
        });



app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use('/case', caseRoutes);
app.use('/patients', patientsRoutes);
app.use('/', hospitalRoutes);