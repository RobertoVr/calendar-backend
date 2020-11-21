const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION,
            {
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );
        console.log('Base de datos en linea..')
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la BD');
    }
}

module.exports = {
    dbConnection
}