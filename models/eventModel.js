const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    fecha: { type: Date },
    lugar: { type: String },
    participantes: [{ nombre: String, email: String }],
    capacidadMaxima: { type: Number },
    tickets: { type: Number }
},
    {
        timestamps: true,
    }
);

const modelEvent = mongoose.model("Evento", eventSchema);
module.exports = modelEvent;