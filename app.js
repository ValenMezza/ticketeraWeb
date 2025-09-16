
// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// // Servir toda la carpeta html como estática
// app.use(express.static(path.join(__dirname, 'html')));

// // Ruta principal que envía index.html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'html', 'index.html'))   ;
// });

// // Iniciar servidoraaa
// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });


const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (css, js, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal -> renderiza index.ejs
app.get('/', (req, res) => {
    res.render('index', { titulo: 'Bienvenido a mi App con EJS' });
});

// Ejemplo de otra vista
app.get('/contacto', (req, res) => {
    res.render('contacto', { titulo: 'Página de Contacto' });
});
app.get('/ticket/create', (req,res)=>{
    res.render('create', { titulo: 'Crear nuevo elemento' });
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
