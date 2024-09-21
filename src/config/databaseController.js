const mysql = require('mysql2');
const { promisify } = require('util');
const { database } = require('./keys');
const { CONSTANTS } = require('../utils/utils');

const pool = mysql.createPool(database);//Se crea el pool de conexion 

//Iniciamos convexion con la base de datos 
pool.getConnection((error, conexion) => { 
    //Validar si la conexion tiene algun tipo de error
    if(error){
        // Validando codigos de error comunes
        switch(error.code){
            case CONSTANTS.PROTOCOL_CONNECTION_LOST:
                //Indica que la conexion con la base de datos esta perdida 
                console.error('DATABASE CONNCETION WAS CLOSED');
                break;
                //Indica que existen demasiadas conexiones 
            case CONSTANTS.ER_CON_COUNT_ERROR:
                console.error('DATABASE HAS TO MANY CONNECTIONS');
                break;
                //Indica que la conexion fue rechazada 
            case CONSTANTS.ECONNREFUSED:
                console.error('DATABASE CONNCETION WAS REFUSED');
                break;
                //Indica que el acceso esta denegado 
            case CONSTANTS.ER_ACCESS_DENIED_ERROR:
                console.error('ACCESS DENIED FOR USER');
                break;
            default:
                console.error('Error de bases de datos no encontrado');
                break;
        }
    }
    //Si la conxion es exitosa, imprimir un mensaje indicandolo 
    if(conexion) {
        console.log('Conexion establecida con la base de datos');
        conexion.release();
    }
    return;
});
//Configurando PROMISIY para permitir en cada consulta un async/await (promesas)
pool.query = promisify(pool.query);

module.exports = pool;