var chai = require('chai');
var chaiHttp = require('chai-http');
const assert = require('assert').strict;
chai.use(chaiHttp);


describe('apiCliente', function () {
    it('Cuando solicito pedido, reciben mi pedido', function () {
        // Respuesta esperada de la API
        var expect = "Ciente: 1234 ,su pedido a sido recibido.";

        // Realizamos la simulacion de la conexion y peticion
        chai.request('http://localhost:4000').keepOpen()
        .post('/solicitarPedido/')
        .type('form')
        .set('content-type', 'application/json')
        .send(JSON.stringify({
            Nit: '1234',
            Nombre: 'Cliente_1234',
            Menu: '1'
        }))
        .end(function (err, res) {
            // Sabemos que en res.body.data
            // encontramos la respuesta enviada
            // desde la api y la comparamos con
            // el expect que definimos
            assert.equal(res.body.data,expect);
        });
    });
});


describe('apiCliente', function () {
    it('Cuando verifico pedido, esta siendo repartido', function () {
        // Respuesta esperada de la API
        var expect = "Ciente: 1234 ,su pedido esta siendo repartido.";

        // Realizamos la simulacion de la conexion y peticion
        chai.request('http://localhost:4000').keepOpen()
        .post('/verificarPedido/')
        .type('form')
        .set('content-type', 'application/json')
        .send(JSON.stringify({
            Nit: '1234'
        }))
        .end(function (err, res) {
            // Sabemos que en res.body.data
            // encontramos la respuesta enviada
            // desde la api y la comparamos con
            // el expect que definimos
            assert.equal(res.body.data,expect);
        });
    });
});


describe('apiCliente', function () {
    it('Cuando verifico reparto, mi pedido acaba de ser entregado', function () {
        // Respuesta esperada de la API
        var expect = "Ciente: 1234 ,su pedido a sido entregado.";

        // Realizamos la simulacion de la conexion y peticion
        chai.request('http://localhost:4000').keepOpen()
        .post('/verificarReparto/')
        .type('form')
        .set('content-type', 'application/json')
        .send(JSON.stringify({
            Nit: '1234'
        }))
        .end(function (err, res) {
            // Sabemos que en res.body.data
            // encontramos la respuesta enviada
            // desde la api y la comparamos con
            // el expect que definimos
            assert.equal(res.body.data,expect);
        });
    });
});