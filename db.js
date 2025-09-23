// db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",      // usuario de postgres       // host del servidor
  database: "ticketera",   // nombre de la base
  password: "Valenmezza123", // contraseña
  port: 5432,              // puerto por defecto
});

pool.connect()
    .then(() => console.log('Conectado a PostgreSQL'))
    .catch(err => console.error('Error de conexión', err));

module.exports = pool;
