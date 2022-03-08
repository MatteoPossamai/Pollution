const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//Initializing
const app = express(); 
const port = 5000;

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