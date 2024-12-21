const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    fecha: { type: Date, required: true },
    lugar: { type: String },
    participantes: [{ nombre: String, email: String }],
    capacidadMaxima: { type: Number },
    entradasDisponibles: { type: Number }
},
    {
        timestamps: true,
    }
);

const modelEvent = mongoose.model("Evento", eventSchema);
module.exports = modelEvent;