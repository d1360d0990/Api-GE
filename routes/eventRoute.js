const express = require('express');
const router = express.Router();
const modelEvent = require('../models/eventModel'); // Importar el modelo de libros


// Obtener todos los Eventos (GET)
router.get('/api/events', async (req, res) => {
    try {
        const eventos = await modelEvent.find(); // Obtener todos los libros
        res.status(200).send(eventos);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los eventos', error });
    }
});

// Obtener un evento por ID (GET)
router.get('/eventos/:id', async (req, res) => {
    try {
        const libro = await modelEvento.findById(req.params.id); // Buscar libro por ID
        if (!libro) {
            return res.status(404).send({ mensaje: 'Libro no encontrado' });
        }
        res.status(200).send(eventos);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el evento', error });
    }
});

// Crear un nuevo libro (POST)
router.post('/addEvent', async (req, res) => {
    const body = req.body;
    try {
        const nuevoEvento = await modelEvent.create(body); // Insertar en la base de datos
        res.status(201).send(nuevoEvento); // 201 indica que se ha creado un recurso
    } catch (error) {
        res.status(400).send(error); // Manejar errores
    }
});

// Actualizar un libro por ID (PUT)
router.put('/eventos/:id', async (req, res) => {
    try {
        const eventoActualizado = await modelEvent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!eventoActualizado) {
            return res.status(404).send({ mensaje: 'Evento no encontrado' });
        }
        res.status(200).send(eventoActualizado);
    } catch (error) {
        res.status(400).send({ mensaje: 'Error al actualizar el evento', error });
    }
});

// Eliminar un evento por ID (DELETE)
router.delete('/eventos/:id', async (req, res) => {
    try {
        const eventoEliminado = await modelEvent.findByIdAndDelete(req.params.id); // Eliminar libro por ID
        if (!eventoEliminado) {
            return res.status(404).send({ mensaje: 'Evento no encontrado' });
        }
        res.status(200).send({ mensaje: 'Evento eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el evento', error });
    }
});

//--------------------------------------EndPoint----------------------------------------------------
//Obetener libros segun los filtros de busqueda
router.get ('/eventos/negocio/busqueda', async (req,res)=>{
    const {autor, categoria, estado} = req.query; //obtenes autor, categoria y estado desde la query

    try{
        const query = {};// creamos un objeto vacio para almacenar los filtros
        if(evento) query.evento = evento; //si el autor esta en los query params, lo va a agregar al filtro
        if(asistente) query.asistente = asistente;//si la categoria esta en los query params, lo va a agregar al filtro
        if(ubicacion) query.ubicacion = ubicacion;//si el estado esta en los query params, lo va a agregar al filtro

        const evento = await modelEvent.find (query);

        if(!evento.length){
            return res.status (404).send({mensaje: 'No se encontraron eventos con los fliltros proporcionados'});
        }
        res.status (200).send(eventos);


    }catch (error){
        res.status (500).send ({mensaje: 'Error al obtener los eventos', error})
    }
})

module.exports = router;