const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { Pool } = require('pg');

//CONEXION POSTGRESQL
const pool1 = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'morales',
    password: '1234',
    port: 5432,
  });

//BASICO

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//HTML

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

//CONSULTAS POSTGRESQL

app.get('/productos', (req, res) => {
    pool1.query('SELECT * FROM producto', (error, results) => {
      if (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      res.json(results.rows);
    });
  });
  
  
