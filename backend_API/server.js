const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

//Import enviromental variabiles
require('dotenv').config();

//Get one day in milliseconds
const oneDay = 86400000;

//Initializing
const app = express(); 
const port = process.env.PORT || 5000;

//Setup session and cookie
app.use(sessions({
    secret: process.env.SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(cookieParser());

//Let imported functionality working
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Routes
const router = require('./routes/router');
app.use('',router);

app.listen(port, ()=>{
    console.log(`Server is running on port:${port}`);
});