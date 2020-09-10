const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');

function log_message_text(str_Message,request){
	console.log(new Date(dt.now()), request, str_Message);
}

app.post('/receive_order', (req, res) => {    
    log_message_text('PETICION RECIBIDA, PROCESANDO','receive_order');
    log_message_text('Se recibieron los siguientes datos: '+JSON.stringify(req.body),'receive_order');
    log_message_text('El pedido: '+ req.body.order + ' se encuentra  listo','receive_order');
    res.status(200).send({ "message": `El pedido: ${req.body.order} recibida y procesada.` });
    log_message_text('SE TERMINO DE PROCESAR LA PETICION','receive_order');
});

app.get('/report_status', (req, res) => {    
    log_message_text('PETICION RECIBIDA, PROCESANDO','report_status');
    log_message_text(`Se recibio la solicitud de estado del pedido ${req.query.order}`,'report_status')
    res.status(200).send({ "message": `El pedido: ${req.query.order} esta en ruta` });
    log_message_text(`La respuesta fue enviada al cliente`, 'report_status');
    log_message_text("SE TERMINO DE PROCESAR LA PETICION",'report_status');
});

app.get('/finish_order', (req, res) => {    
    log_message_text('PETICION RECIBIDA, PROCESANDO','finish_order');
    log_message_text(`El pedido: ${req.query.order} ha sido entregado, su estado será cambiado`,'finish_order');    
    res.status(200).send({ "message": `El pedido: ${req.query.order} se finalizo exitosamente` });
    log_message_text("SE TERMINO DE PROCESAR LA PETICION",'finish_order');
});

app.listen(port, () => {
    log_message_text('INICIO MICROSERVICIO REPARTIDOR - Corriendo en http://localhost:' + port, '780 SA');
});