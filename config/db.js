const mongoose = require ('mongoose');
const dotenv = require('dotenv');

//Función para conectar a MongoDB
const dbconnect = async() => {
    try {
        await mongoose.connect (process.env.MONGODB_URI);
        console.log ('conexión a la base de datos establecida');
    } catch (error) {
        console.error ('Error al intentar conectar con la base de datos: ', error);
        process.exit (1); //detemos el proceso si hay un error grave en la conexión
    }
}

module.exports = dbconnect;