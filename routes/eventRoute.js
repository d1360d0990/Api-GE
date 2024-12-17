const express = require('express');
const router = express.Router();
const modelEvent = require('../models/eventModel'); // Importar el modelo de eventos


// Obtener todos los Eventos (GET)
router.get('/events', async (req, res) => {
    try {
        const eventos = await modelEvent.find().limit(100); // Obtener todos los eventos
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los eventos', error });
    }
});

// Obtener un evento por ID (GET)
router.get('/events/:id', async (req, res) => {
    try {
        const eventos = await modelEvent.findById(req.params.id); // Buscar evento por ID
        if (!eventos) {
            return res.status(404).json({ mensaje: 'evento no encontrado' });
        }
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el evento', error });
    }
});

// Crear un nuevo evento (POST)
router.post('/addEvent', async (req, res) => {
    const body = req.body;
    try {
        const nuevoEvento = await modelEvent.create(body); // Insertar en la base de datos
        res.status(201).json(nuevoEvento); // 201 indica que se ha creado un recurso
    } catch (error) {
        res.status(400).json(error); // Manejar errores
    }
});

// Actualizar un evento por ID (PUT)
router.put('/events/:id', async (req, res) => {
    try {
        const eventoActualizado = await modelEvent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!eventoActualizado) {
            return res.status(404).json({ mensaje: 'Evento no encontrado' });
        }
        res.status(200).json(eventoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el evento', error });
    }
});

// Eliminar un evento por ID (DELETE)
router.delete('/eventos/:id', async (req, res) => {
    try {
        const eventoEliminado = await modelEvent.findByIdAndDelete(req.params.id); // Eliminar evento por ID
        if (!eventoEliminado) {
            return res.status(404).json({ mensaje: 'Evento no encontrado' });
        }
        res.status(200).json({ mensaje: 'Evento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el evento', error });
    }
});

//--------------------------------------EndPoint----------------------------------------------------
//Obetener eventos segun los filtros de busqueda
// Obtener eventos según los filtros de búsqueda
router.get('/eventos/negocio/busqueda', async (req, res) => {
    const { evento, asistente, ubicacion } = req.query;
    try {
        const query = {}; // Creamos un objeto vacío para almacenar los filtros
        if (evento) query.evento = evento;
        if (asistente) query.asistente = asistente;
        if (ubicacion) query.ubicacion = ubicacion;

        const eventos = await modelEvent.find(query); // Almacena los resultados de la búsqueda en 'eventos'

        if (!eventos.length) {
            return res.status(404).json({ mensaje: 'No se encontraron eventos con los filtros proporcionados' });
        }
        res.status(200).json(eventos); // Devuelve los resultados correctos
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los eventos', error });
    }
});


module.exports = router;