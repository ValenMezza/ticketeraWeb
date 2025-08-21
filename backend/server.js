const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para recibir tickets y guardarlos en archivo
app.post('/save-tickets', (req, res) => {
    const tickets = req.body;

    // Ruta al archivo json/tickets.json
    const filePath = path.join(__dirname, 'json', 'tickets.json');

    // Guardar los tickets en el archivo
    fs.writeFile(filePath, JSON.stringify(tickets, null, 2), err => {
        if (err) {
            console.error('Error guardando tickets:', err);
            return res.status(500).json({ message: 'Error guardando tickets' });
        }
        console.log('Tickets guardados correctamente.');
        res.json({ message: 'Tickets guardados' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
