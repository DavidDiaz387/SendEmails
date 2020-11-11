let express = require("express");
let app = express();

// Variables globales modificables
let fechas = [
    {
        
        fecha:"22:10",
        email:'jdaviddz739@gmail.com'
        
    },{
        
        fecha:"22:12",
        email:'jdaviddz739@gmail.com'
        
    },{
        
        fecha:"22:14",
        email:'jdaviddz739@gmail.com'
    },{
        
        fecha:"22:16",
        email:'jdaviddz739@gmail.com'
        
    }
]

// Es la libreria para poder generar y enviar emails 
let nodemailer = require("nodemailer");

// Se crea un nuevo dato de hora y fecha actual
function actualizar(){
    let day = new Date()
    let dayNow = `${day.getDate()}-${day.getMonth()+1}-${day.getFullYear()}`  
    let date = `${day.getHours()}:${day.getMinutes()}`
    buscarFecha(date)
    //verificarEnvio(dayNow,date)
    console.log("Fecha de Actualizacion:",dayNow);
    console.log("Hora:"+date);
}

// Se ejecuta la funcion
actualizar()

// El interval hace que la funcion se ejecute segun la cantidad de segundos que queremos
setInterval(actualizar, 60000);

// Verificacion de la fecha u hora para que ejecute el envio de Email
/*function verificarEnvio(fecha,hora){
    if(hora == 'Hora:18:42'){
        emailSend()
    }
}*/

// Step 1
// Primeramente se autentica el usuario y se confirma el servicio que se utilizara
function emailSend(email){ 
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'jondiaz387@gmail.com',
            pass:'david03515427002',
        }
    })

    // Step 2
    // Se crea el msg, con los detalles del envio 
    let detalleEmail = {
        from:'<jondiaz387@gmail.com>',
        to:email,
        subject:'Luz Azul',
        Cc:'Recordatorio de Pedidos',
        text:'Hola David, funciona el tiempo de envio ! '
    }

    // Step 3 
    // Se enviar a traves del metodo sendMail donde se le pasa los detalles del Email y un callback por si sucede un error
    transporter.sendMail(detalleEmail,(err)=>{
        if(err){
            console.log("Error al enviar");
        }else{
            console.log("Msg send !");
        }
    })
}

// fechas programadas de envio de mail


// Fechas del Dia
let sendToday = []
// Recorrer los valores para indicar la fecha de envios
function buscarFecha(date){
    fechas.forEach(local=>{
        if(local.fecha == date){
            emailSend(local.email)
        }
    })
}

app.listen(3000,()=>{
    console.log("run server port 3000");
})