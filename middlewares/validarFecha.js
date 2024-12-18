const moment = require('moment');

const validarFecha = (req, res, next) => {
    const { fecha } = req.body;

    if (fecha && moment(fecha, "DD/MM/YYYY", true).isValid()) {
        req.body.fecha = moment(fecha, "DD/MM/YYYY").toISOString(); // Convertir a ISO
        next();
    } else {
        return res.status(400).json({ error: "Formato de fecha inválido. Use DD/MM/YYYY." });
    }
};

module.exports = validarFecha;
