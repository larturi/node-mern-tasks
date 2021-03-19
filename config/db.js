const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const conectarDB = async() => {

    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('BD conectada correctamente');
    } catch (error) {
        console.error(error);
        server.close();
        process.emit(1);
    }

};

module.exports = conectarDB;