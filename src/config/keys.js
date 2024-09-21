require('dotenv').config()

module.exports = {
    // Conigurando objeto para iyectarlo en el pol de conexion 
    database: {
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.PORT_DATABASE,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_NAME
    }
}