const pool = require('../../db');

const ticketController = {

    index: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;

            const result = await pool.query(
                'SELECT * FROM tickets ORDER BY id_ticket DESC LIMIT $1 OFFSET $2',
                [limit, offset]
            );

            const totalResult = await pool.query('SELECT COUNT(*) FROM tickets');
            const totalTickets = parseInt(totalResult.rows[0].count);
            const totalPages = Math.ceil(totalTickets / limit);



            res.render('index', {
                titulo: 'Bienvenido a mi App con EJS',
                tickets: result.rows,      
                currentPage: page,
                totalPages: totalPages
            });
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
            const { asunto, descripcion, estado, prioridad } = req.body;

            await pool.query(
                `INSERT INTO tickets (asunto, descripcion, estado, prioridad) VALUES ($1, $2, $3, $4)`,
                [asunto, descripcion, estado, prioridad]
            );

            console.log("Ticket guardado correctamente");

            res.redirect('/');
        } catch (err) {
            console.error("Error al guardar ticket:", err);
            res.status(500).send("Error al guardar ticket");
        }
    },
    show: async (req, res) => {
        try {
            const { id } = req.params;

            
            const idNum = Number(id);
            if (!Number.isInteger(idNum) || idNum <= 0) {
                return res.status(400).send('ID de ticket inválido');
            }

            const result = await pool.query(
                'SELECT * FROM tickets WHERE id_ticket = $1 LIMIT 1',
                [idNum]
            );

            if (result.rows.length === 0) {
                return res.status(404).render('404', { titulo: 'Ticket no encontrado' });
            }

            const ticket = result.rows[0];

            
            res.render('ticket', {
                titulo: `Ticket #${ticket.id_ticket}`,
                ticket
            });
        } catch (err) {
            console.error('Error al obtener detalle del ticket:', err);
            res.status(500).send('Error al obtener el detalle del ticket');
        }
    }, edit: async (req, res) => {
        try {
            const { id } = req.params;

            const idNum = Number(id);
            if (!Number.isInteger(idNum) || idNum <= 0) {
                return res.status(400).send('ID de ticket inválido');
            }
            const result = await pool.query(
                'SELECT * FROM tickets WHERE id_ticket = $1 LIMIT 1',
                [idNum]
            );
            if (result.rows.length === 0) {
                return res.status(404).render('404', { titulo: 'Ticket no encontrado' });
            }   
            const ticket = result.rows[0];
            res.render('edit', {
                titulo: `Editar Ticket #${ticket.id_ticket}`,
                ticket
            });
        } catch (err) {
            console.error('Error al obtener detalle del ticket para edición:', err);
            res.status(500).send('Error al obtener el detalle del ticket para edición');
        }
    },
};

module.exports = ticketController;
