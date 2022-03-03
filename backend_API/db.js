const Pool = require('pg').Pool;

const pool = new Pool ({
    user: "postgres",
    password: "Juventus",
    host: "localhost",
    port: 5432, 
    database: "campione"
})

module.exports = pool;