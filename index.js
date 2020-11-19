const express = require('express');
const routes = require('./routes');
require('./config/config');

// crear el servidor de express
const app = express();

// directorio publico
app.use(express.static('public'));

// parser body JSON
app.use(express.json());

//rutas
app.use('/api', routes);

// escuchar peticiones
app.listen(process.env.PORT || 8080, () => {
    console.log('Servidor corriendo en el puerto: ' + 4000);
})