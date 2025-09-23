const configController = {
    index: (req, res) => {
        res.render('configuracion', { titulo: 'Página de Configuración' });
    }
};

module.exports = configController;