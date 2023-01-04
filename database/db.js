import mysql from 'mysql'; //Importamos MySQL
import { DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT, DB_USER } from '../src/config.js';
/* Creamos nuestro objeto de conexion */
const conexion = mysql.createConnection({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_NAME,
    port:DB_PORT
})

conexion.connect((err)=>{
    if(err){
        console.log("ERROR! Hubo un problema al conectarse a la BD! "+ err)
        return;
    }
    console.log("Conectado a la BD!");
})

export default conexion