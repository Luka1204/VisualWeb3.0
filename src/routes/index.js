import express, { urlencoded } from 'express' /* Importamos Express */
import {json} from 'express'; //Importamos el paquete JSON del modulo de express
import bcrypt from 'bcrypt';
import { Router } from 'express';
import conexion from '../../database/db.js'


const router = Router();/* Declaramos nuestro enrutador */

/* Manera de capturar la data de los forms */
router.use(urlencoded({extended:false}))
router.use(express(json))

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/qrcode',(req,res)=>{
    res.render('qrGen')
})

router.get('/passgen',(req,res)=>{
    res.render('passGen')
})
router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/',(req,res)=>{
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const email = req.body.email;
        const telefono = req.body.telefono;
        const mensaje = req.body.mensaje;
        conexion.query("INSERT INTO mensajes SET ? ",{nombre:nombre,apellido:apellido,email:email,telefono:telefono,mensaje:mensaje}, (err,res)=>{
            if(err){
                console.log("Hubo un error, por favor intente nuevamente " + err);
            }else{
               console.log("Inserccion correcta") 
            }
    })
    res.render('index',{
        alert:true,
        alertTitle:'Envio de mensajes',
        alertMessage:"Envio de mensaje exitoso!",
        alertIcon:"success",
        showConfirmButton:true,
        timer:1500,
        ruta:''
    })
})

router.post('/register',(req,res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const rol = 'user'
    const pass = req.body.pass; 

    let passHash =  bcrypt.hash(pass,8);

    conexion.query("INSERT INTO users SET ? ",{nombre:nombre,apellido:apellido,email:email,rol:rol,pass:passHash}, (err,res)=>{
        if(err){
            console.log("Hubo un error, por favor intente nuevamente " + err);
        }else{
            res.render('register',{
                alert:true,
                alertTitle:'Registro',
                alertMessage:"Regsitro exitoso!",
                alertIcon:"success",
                showConfirmButton:true,
                timer:1500,
                ruta:''
            })
        }
    })
})

export default router