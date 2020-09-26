const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var dateTime = require('node-datetime')
var dt = dateTime.create()
dt.format('m/d/Y H:M:S')

function log_message_text(str_Message, request){
  console.log(new Date(dt.now()), request, str_Message)
}

app.post('/receive_order', (req, res) => {
  log_message_text('PETICION RECIBIDA, PROCESANDO', 'receive_order')
  log_message_text('Se recibieron los siguientes datos: ' + JSON.stringify(req.body), 'receive_order')
  log_message_text('El pedido: ' + req.body.order + ' será realizado y enviado cuando este listo', 'receive_order')
  res.status(200).send({ 'message': `El pedido: ${req.body.order} recibida y procesada.` })
  log_message_text('SE TERMINO DE PROCESAR LA PETICION', 'receive_order')
})

app.get('/report_status', (req, res) => {
  log_message_text('PETICION RECIBIDA, PROCESANDO', 'report_status')
  log_message_text(`Se recibio la solicitud de estado del pedido ${req.query.order}`, 'report_status')
  res.status(200).send({ 'message': `El pedido: ${req.query.order} fue enviado al repartidor` })
  log_message_text(`La respuesta fue enviada al cliente`, 'report_status')
  log_message_text('SE TERMINO DE PROCESAR LA PETICION', 'report_status')
})

app.get('/request_order', (req, res) => {
  log_message_text('PETICION RECIBIDA, PROCESANDO', 'request_order')
  log_message_text(`El pedido: ${req.query.order} ha sido entregado, su estado será cambiado`, 'request_order')
  
  axios.post('http://localhost:4000/recive_order_dealer', {
    id: 'order_12460'        
  })
    .then(function (response) {
      log_message_text(`El repartidor responde: ${response.data.message}`, 'request_order')
      res.status(200).send({ 'message': `Pedido:  ${response.data.message} enviada correctamente` })
    })
    .catch(function (error) {
      log_message_text(`Ocurrio un error al notificar al repartidor, intente mas tarde.`, 'request_order')
      res.status(200).send({ 'message': `No fue posible notificar al repartidor, intente mas tarde.` })
    })

  log_message_text('SE TERMINO DE PROCESAR LA PETICION', 'request_order')
})

app.listen(port, () => {
  log_message_text('INICIO MICROSERVICIO RESTAURANTE - Corriendo en http://localhost:' + port, '780 SA')
})
