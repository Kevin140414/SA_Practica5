const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');

function log_message_text(str_Message,request){
	console.log(new Date(dt.now()), request, str_Message);
}

app.post('/order_restaurant', (req, res) => {    
    log_message_text('PETICION RECIBIDA, PROCESANDO','order_restaurant');
    
    axios.post('http://localhost:3001/receive_order', {
        order: 'pizza'      
      })
      .then(function (response) {
        log_message_text(`Solicitud enviada, respuesta: ${response.data.message}`,'order_restaurant')
        res.status(200).send({ "message": response.data.message });
      })
      .catch(function (error) {
        log_message_text(`Error al enviar la solicitud.`,'order_restaurant')
        res.status(200).send({ "message": `No fue posible realizar el pedido, intente mas tarde.` });
      });

    log_message_text('SE TERMINO DE PROCESAR LA PETICION','order_restaurant');
});


app.get('/state_restaurant', (req, res) => {    
    log_message_text('PETICION RECIBIDA, PROCESANDO','state_restaurant');
    
    axios.get('http://localhost:3001/report_status?order=order_1234', {
      
      })
      .then(function (response) {
        log_message_text(`Solicitud enviada, respuesta: ${response.data.message}`,'state_restaurant')
        res.status(200).send({ "message": response.data.message });
      })
      .catch(function (error) {
        log_message_text(`Error al enviar la solicitud.`,'state_restaurant')
        res.status(200).send({ "message": `No fue posible realizar el pedido, intente mas tarde.` });
      });

    log_message_text('SE TERMINO DE PROCESAR LA PETICION','state_restaurant');
});


app.get('/state_dealer', (req, res) => {    
    log_message_text('PETICION RECIBIDA, PROCESANDO','state_dealer');
    
    axios.get('http://localhost:3002/report_status', {
        params: {
          order: req.query.order  
        }    
      })
      .then(function (response) {
        log_message_text(`Solicitud enviada, respuesta: ${response.data.message}`,'state_dealer')
        res.status(200).send({ "message": response.data.message });
      })
      .catch(function (error) {
        log_message_text(`Error al enviar la solicitud.`,'state_dealer')
        res.status(200).send({ "message": `No fue posible realizar el pedido, intente mas tarde.` });
      });

    log_message_text('SE TERMINO DE PROCESAR LA PETICION','state_dealer');
});


app.post('/recive_order_dealer', (req, res) => {    
    log_message_text('PETICION RECIBIDA, PROCESANDO','recive_order_dealer');
    
    axios.get('http://localhost:3002/receive_order', {
        params: {
          order: req.body.order
        }    
      })
      .then(function (response) {
        log_message_text(`Solicitud enviada, respuesta: ${response.data.message}`,'recive_order_dealer')
        res.status(200).send({ "message": response.data.message });
      })
      .catch(function (error) {
        log_message_text(`Error al enviar la solicitud.`,'r_order_restaurant')
        res.status(200).send({ "message": `No fue posible realizar el pedido, intente mas tarde.` });
      });

    log_message_text('SE TERMINO DE PROCESAR LA PETICION','recive_order_dealer');
});

app.listen(port, () => {
    log_message_text('INICIO EBS - Corriendo en http://localhost:' + port, '780 SA');
});
