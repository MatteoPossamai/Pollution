const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//Import enviromental variabiles
require('dotenv').config();

//Initializing
const app = express(); 
const port = process.env.PORT || 5000;

//Let imported functionality working
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Routes
const router = require('./routes/router');
app.use('',router);

app.listen(port, ()=>{
    console.log(`Server is running on port:${port}`);
})

//https://help.heroku.com/DR0TTWWD/seeing-fatal-no-pg_hba-conf-entry-errors-in-postgres