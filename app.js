const express = require('express');
const path = require('path');
const ticketController = require('./controller/ticket/ticketController');
const pool = require('./db');

const app = express();
const PORT = 8000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear body (formularios y JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', ticketController.index);
app.get('/contacto', (req, res) => {
    res.render('contacto', { titulo: 'Página de Contacto' });
});

//creacion de tickets
app.get('/ticket/create', ticketController.create);
app.post('/newTicket', ticketController.store);

//detalle de tickets
app.get('/ticket/:id', ticketController.show);

//configuracion
app.get('/configuration', (req, res) => {
    res.render('configuration', { titulo: 'Página de Configuración' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
