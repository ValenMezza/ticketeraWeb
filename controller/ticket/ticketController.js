// const pool = require('../../db');

// const ticketController = {
//     // Listado de tickets
//     index: async (req, res) => {
//         try {
//             const result = await pool.query('SELECT * FROM tickets ORDER BY fecha_creacion DESC');
//             res.render('index', {
//                 titulo: 'Bienvenido a mi App con EJS',
//                 tickets: result.rows
//             });
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Error obteniendo tickets');
//         }
//     },

//     // Mostrar formulario
//     create: (req, res) => {
//         res.render('create', { titulo: 'Crear nuevo Ticket' });
//     },

//     // Guardar en la DB
//     store: async (req, res) => {
//         const { asunto, descripcion, id_proyecto, id_creador, id_asignado } = req.body;

//         try {
//             await pool.query(
//                 `INSERT INTO tickets (asunto, descripcion, id_proyecto, id_creador, id_asignado)
//                  VALUES ($1, $2, $3, $4, $5)`,
//                 [asunto, descripcion, id_proyecto, id_creador, id_asignado || null]
//             );

//             res.redirect('/');
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Error guardando ticket');
//         }
//     }
// };

// module.exports = ticketController;


const pool = require('../../db');

const ticketController = {
    index: async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM pruebatickets');
            res.render('index', { titulo: 'Bienvenido a mi App con EJS', tickets: result.rows });
            console.log(result.rows);
        } catch (err) {
            console.error("Error al obtener tickets:", err);
            res.status(500).send("Error al obtener tickets");
        }
    },

    create: (req, res) => {
        res.render('create', { titulo: 'Crear nuevo Ticket' });
    },

store: async (req, res) => {
    console.log("Datos recibidos del formulario:", req.body);

    try {
        const { asunto, descripcion } = req.body;

        await pool.query(
            `INSERT INTO pruebatickets (asunto, descripcion) VALUES ($1, $2)`,
            [asunto, descripcion]
        );

        console.log("Ticket guardado correctamente");
        res.redirect('/');
    } catch (err) {
        console.error("Error al guardar ticket:", err);
        res.status(500).send("Error al guardar ticket");
    }
}
};

module.exports = ticketController;
