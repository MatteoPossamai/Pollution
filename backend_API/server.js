const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//const poolDB = require("./db");

const app = express(); 
const port = 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server is running on port:${port}`);
})