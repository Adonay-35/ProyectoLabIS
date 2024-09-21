const express = require('express');

//Inicializaciones 
const app = express();

require('dotenv').config()

//Ajustes del servidor 
app.set('port', process.env.PORT || 4500);

//Configuracion de rutas
app.use(require('./routes'));// Node busca automaticamente el index.js del modulo

//Iniciar el servidor 
app.listen(app.get('port'),() => {
    console.log('Servidotrinicializado en el puerto: ', app.get('port'));
});