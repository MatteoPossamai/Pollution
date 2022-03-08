const express = require('express');
const pool = require("../db");

const router = express.Router();

//Get all the point for the map
router.get('/allpoints', async (req,res) =>{
    try {
        const points = await pool.query(
            `SELECT nome, latitudine,longitudine 
            FROM luogo`);
        res.json(points.rows);
    }catch(err){
        console.error(err.message);
    }
});

//Add new tipo sito
router.post('/addtiposito', async (req, res) =>{
    const description = req.body.descrizione;

    try {
        const sito = await pool.query(
            'INSERT INTO tipoSito(descrizione) VALUES ($1);',
            [description]
        );
        res.json("NUOVO TIPO SITO AGGIUNTO: "+sito.rows);
    }catch(err){
        console.error(err.message);
    }
});

//Add new tipo campione
router.post('/addtipocampione', async (req, res) =>{
    const description = req.body.descrizione;

    try {
        const campione = await pool.query(
            `INSERT INTO tipoCampione(descrizione) 
            VALUES ($1)
            RETURNING *;`,
            [description]
        );
        res.json("NUOVO TIPO CAMPIONE AGGIUNTO: " + campione.rows);
    }catch(err){
        console.error(err.message);
    }
});

//Add new luogo
router.post('/addluogo', async (req, res) =>{
    const nome = req.body.nome;
    const tipo_sito = req.body.tiposito;
    const latitudine = req.body.latitudine;
    const longitudine = req.body.longitudine;
    const descrizione = req.body.descrizione;
    const indirizzo = req.body.indirizzo;
    const immagine1 = req.body.immagine1;

    try {
        const luogo = await pool.query(
            `INSERT INTO luogo(nome, tipo_sito, latitudine, longitudine, descrizione, indirizzo, immagine1)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`, 
            [nome, tipo_sito, latitudine, longitudine, descrizione, indirizzo, immagine1]
        );
        res.json("NUOVO LUOGO AGGIUNTO: " + luogo.rows);
    }catch(err){
        console.error(err.message);
    }
});

//Add new misurazione
router.post('/addmisurazione', async (req, res) =>{
    const ny = req.body.ny;
    const pt = req.body.pt;
    const pp = req.body.pp;
    const plt = req.body.plt;
    const hg = req.body.hg;
    const ptl = req.body.ptl;
    const tipo_campione = req.body.tipocampione;
    const meteo = req.body.meteo;
    const note = req.body.note;
    const pos = req.body.luogo;
    const dataM = req.body.dataM;
    const immagine2 = req.body.immagine2;

    try {
        const luogo = await pool.query(
            `INSERT INTO misurazione(nylon6, polyethylene_terephthalate, 
                polypropylene, polyethylene, hostasol_green, phthalocyanine,
                tipo_campione, meteo, note, luogo, dataM, immagine2)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *`,
            [ny, pt, pp, plt, hg, ptl, tipo_campione, meteo, note, 
                pos, dataM, immagine2]
        );
        res.json("NUOVA MISURAZIONE AGGIUNTO: " + luogo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});

//Get information about a specific misuration
//Non completato

router.get('/getmisurazione/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const misurazione = await pool.query(
            `SELECT *
            FROM misurazione 
            WHERE id = $1`, [id]
        );
        res.json(misurazione.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});


module.exports = router;