const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

class Server {
    //Metodo constructor del servidor, se inicializa cada vez que se instancia al servidor
    constructor() {
        //Se asigna a la variable app una nueva instancia de express
        this.app = express();
        //Llamado al puerto de escucha
        this.port = process.env.PORT;
        //Definición de paths del API Rest
        this.usersPath = '/api/users';
        //Conexión a base de datos
        this.conectarDB();
        //Middlewares (Añaden funcionalidad al web server)
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
    }

    //Método asíncrono de inicialización de conexión.
    async conectarDB() {
        await dbConnection();
    }
    //Método de inicialización de Middlewares (.use para llamar métodos middleware)
    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio público
        this.app.use(express.static('public'));
    }
    //Método de inicialización de rutas
    routes() {
        this.app.use(this.usersPath, require('../routes/users.routes.js'))
    }
    //Método de escucha del servidor (ejecuta el servidor)
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }

}

module.exports = Server;