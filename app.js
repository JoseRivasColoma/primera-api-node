//Importación variables de entorno
require('dotenv').config();
//Importación Clase del Servidor
const Server = require('./models/server');
//Inicialización servidor
const server = new Server();
//Ejecutar Servidor
server.listen();



 
