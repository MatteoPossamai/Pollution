const express = require('express');
const pool = require("../db");

const router = express.Router();

let sha256 = require('js-sha256').sha256;

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
router.get('/getmisurazione/:nome', async (req, res) => {
    const nome = req.params.nome;

    try {
        const misurazione = await pool.query(
            `SELECT *
            FROM misurazione JOIN luogo
                ON luogo = nome
            WHERE nome = $1
            ORDER BY dataM DESC;`, [nome]
        );
        res.json(misurazione.rows);
    }catch(err){
        console.error(err.message);
    }
});

router.get('/getallcampioni', async (req, res) => {

    try {
        const campioni = await pool.query(
            `SELECT *
            FROM tipoCampione`);
        res.json(campioni.rows);
    }catch(err){
        console.error(err.message);
    }
});

router.get('/getallsiti', async (req, res) => {

    try {
        const siti = await pool.query(
            `SELECT *
            FROM tipoSito`);
        res.json(siti.rows);
    }catch(err){
        console.error(err.message);
    }
});

router.get('/getallluoghi', async (req, res) => {

    try {
        const luoghi = await pool.query(
            `SELECT *
            FROM luogo`);
        res.json(luoghi.rows);
    }catch(err){
        console.error(err.message);
    }
});

router.delete('/deletesiti/:id', async (req, res) => {
    const id = req.params.id; 

    try {
        await pool.query(`
            DELETE FROM tipoSito
            WHERE id = ($1)
        `, [id])
        res.json('Deleted the site from the database')
    }catch(err){
        console.error(err);
    }
})

router.delete('/deletecampione/:id', async (req, res) => {
    const id = req.params.id; 

    try {
        await pool.query(`
            DELETE FROM tipoCampione
            WHERE id = ($1)
        `, [id])
        res.json('Deleted the campione from the database')
    }catch(err){
        console.error(err);
    }
})

router.delete('/deleteluogo/:id', async (req, res) => {
    const id = req.params.id; 

    try {
        await pool.query(`
            DELETE FROM luogo
            WHERE nome = ($1)
        `, [id])
        res.json('Deleted the luogos from the database')
    }catch(err){
        console.error(err);
    }
})

router.delete('/deletemisurazione/:id', async (req, res) => {
    const id = req.params.id; 

    try {
        await pool.query(`
            DELETE FROM misurazione
            WHERE id = ($1)
        `, [id])
        res.json('Deleted the luogos from the database')
    }catch(err){
        console.error(err);
    }
})

router.get('/getallmisurazioni', async (req, res) => {
        try {
            const misurazioni = await pool.query(
                `SELECT *
                FROM misurazione`);
            res.json(misurazioni.rows);
        }catch(err){
            console.error(err.message);
        }
})

//Login session management

let active = [];

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await pool.query(
            `SELECT * FROM utente WHERE username= ($1) AND password = MD5($2)`, [username, password]
        );

        if(user.rows.length != 0){
            let token = sha256(JSON.stringify(new Date()));
            active.push(token);
            setTimeout(() => {
                const index = active.indexOf(token);
                active.splice(index, 1);
            } , 1000 * 60 * 60 * 24);
            console.log(active)
            res.json({'logged':'true', 'token': token});
        }else{
            res.json({'logged':'false', 'error':'uncorrect username or password'});
        }
    }catch(err){
        console.error(err.message);
    }
});

router.get('/logged/:token',(req,res) => {
    const token = req.params.token;
    if(active.includes(token)){
        res.send({'logged':'true'});
    }else{
        res.send({'logged':'false'});
    }
});

router.get('/logout',(req,res) => {
    res.json({'logged':'false'});
});

module.exports = router;