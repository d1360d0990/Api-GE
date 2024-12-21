console.log("Aplicacion iniciando...");

const express = require('express');
const app = express();
const dbconnect = require('./config/db');
const eventosRoutes = require('./routes/eventRoute');
const cors = require ('cors')
const dotenv = require('dotenv');
const corsOptions = require('./config/corsOptions');


dotenv.config();

// Configurar CORS
app.use(cors(corsOptions)); 
app.use(express.json()); //Middlewar para parsear JSON
app.use("/api",eventosRoutes); 

dbconnect().then(() => {
   
        console.log('El servidor está corriendo' );
    

}).catch(err => {
    console.log('No se pudo iniciar el servidor debido a un error en la base de datos');
});

module.exports = app;