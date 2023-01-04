import express  from "express"; //Importamos express
import ejs from "ejs"; //Importamos nuestroo motor de plantillas
import {json} from 'express'; //Importamos el paquete JSON del modulo de express
import dotenv from 'dotenv';	//Importamos dotenv
import bcrypt from 'bcrypt';	//Importamos bcrypt
import session from "express-session";	//Imprtamos las sesiones de express
import {dirname,join} from 'path';
import path from	'path'
import { fileURLToPath } from "url";
import indexRoutes from './routes/index.js'; /* Importamos nuestras rutas */
import { PORT } from "./config.js";





const app = express() //Instanciamos express

const __dirname = dirname(fileURLToPath(import.meta.url)); //Declaramos la direccion del directorio

//Declaramos la ruta donde se encuentra nuestro .env
dotenv.config({path:'../env/.env'})


//Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}))
app.use(express(json))
app.use(indexRoutes)
//Seteamos el directorio de assets
/* app.use(express.static('/public'));
 */
app.use(express.static(path.join(__dirname, '/public')));
console.log(path.join(__dirname, '/public'))
//Variables de session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


//Seteamos el motor de plantillas
app.set('view engine','ejs')
app.set('views',join(__dirname,'/views'))	/* Seteamos nuetsras vistas a traves de donde se encuentran pasando el dirname */

//Puerto APP
app.listen( PORT ,(req,res)=>{
    console.log("Puerto inicializado en:", PORT)
});
