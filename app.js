const express = require('express');
const app = express();
const dbconnect = require('./config/db');
const eventosRoutes = require('./routes/eventRoute');
const port = 4000
const cors = require ('cors')

//----------------------------------VerCel - Documentations -------------------------------------------------

app.get("/", (req, res) => res.send("Express on Vercel"));



// Configurar CORS
app.use(cors()); // Permitir CORS para todos los orígenes

app.use(express.json()); //Middlewar para parsear JSON
app.use(eventosRoutes); 

dbconnect().then(() => {
    app.listen(port, () => {
        console.log(`El servidor está corriendo en el puerto' ${port}` );
    });

}).catch(err => {
    console.log('No se pudo iniciar el servidor debido a un error en la base de datos');
});

module.exports = app;