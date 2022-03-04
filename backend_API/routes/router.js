const express = require('express');
const pool = require("../db");

const router = express.Router();

router.get('/allpoints', async (req,res) =>{
    try {
        const points = await pool.query("SELECT latitudine,longitudine FROM luogo");
        res.json(points);
    }catch(err){
        console.error(err.message);
    }
});

module.exports = router;