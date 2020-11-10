let express = require("express")
let app = express()
// Es la libreria para poder generar y enviar emails 
let nodemailer = require("nodemailer");

function actualizar(){
    let day = new Date()
    let dayNow = `Fecha:${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`  
    let date = `Hora:${day.getHours()}:${day.getMinutes()}`
    verificarEnvio(dayNow,date)
    console.log(dayNow);
    console.log(date);
}
actualizar()

let intervalo = setInterval(actualizar, 10000);

function verificarEnvio(fecha,hora){
    if(hora == 'Hora:18:42'){
        emailSend()
    }
}

// Step 1
// Primeramente se autentica el usuario y se confirma el servicio que se utilizara
function emailSend(){ 
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
    to:'jdaviddz739@gmail.com',
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

app.listen(3000,()=>{
    console.log("run server port 3000");
})