const mongoose = require('mongoose');


const dbConnection = async() => {
    try {
        //Conexión a mongo
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser     :true,
            useUnifiedTopology  :true,
        });
        console.log('Base de datos en ejecución');

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {
    dbConnection
}