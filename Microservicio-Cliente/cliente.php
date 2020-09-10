<?php

//funcion para registrar el log de las distintas operaciones en un log e imprimirlo en consola
function log_message_text($str_Message){
	$logmessage =  '[' . date('Y-m-d h:i:s') . '] '. $str_Message . "\n";
	error_log($logmessage, 3,  'log_file.log');  
	print_r($logmessage);    
}

//funcion que crea una solicitud de comida al microservicio del restaurante
function create_request_food($requested_food){
	log_message_text('INICIO DE SOLICITUD AL RESTAURANTE');
	log_message_text('Solicitando al restaurante el siguiente pedidio: ' .$requested_food);
	
	$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://192.168.0.11:4000/order_restaurant");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["order"=>$requested_food]));
    curl_setopt($ch, CURLOPT_POST, 1);
    $response = curl_exec($ch);
    curl_close($ch);

	log_message_text('La repuesta del restaurante es: ' . '"' . json_decode($response)->message . '"');
	log_message_text('FIN DE LA SOLICITUD AL RESTAURANTE');
}

//funcion que crea crea una solicitud para preguntar el estado del pedido al restaurante
function get_state_restaurant($order){
	log_message_text('INICIO DE SOLICITUD AL RESTAURANTE');
	log_message_text('Preguntando el estado del siguiente pedidio: ' .$order);

	$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://192.168.0.11:4000/state_restaurant");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $response = curl_exec($ch);
    curl_close($ch);

	log_message_text('La repuesta del restaurante es: '. '"' . json_decode($response)->message . '"');
	log_message_text('FIN DE LA SOLICITUD AL RESTAURANTE');
}

//funcion que crea crea una solicitud para preguntar el estado del pedido al repartidor
function get_state_dealer($order){
	log_message_text('INICIO DE SOLICITUD AL REPARTIDOR');
	log_message_text('Preguntando el estado del siguiente pedidio: ' .$order);

	$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://192.168.0.11:4000/state_dealer?order=".$order);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $response = curl_exec($ch);
    curl_close($ch);

	log_message_text('La repuesta del repartidor es: '. '"' . json_decode($response)->message . '"');
	log_message_text('FIN DE LA SOLICITUD AL REPARTIDOR');
}

//funcion que despliega el menu de la aplicación
function menu(){
	print("Aplicacion de Cliente\n");
    print("1. Solicitud de pedido al restaurante\n");
    print("2. Solicitud para verificar el estado del pedido al restaurante\n");
    print("3. Solicitud para verificar el estado del pedido al repartidor\n");
    print("4. Salir\n");
}

//ciclo para simular los pedidos y preguntar el estado de los mismos
while(true){
	print "\n";
	menu();
	$option = readline('Ingresa la opción deseada: ');
	print "\n";
	switch ($option) {
		case 1:
			create_request_food('pizza');
			break;
		case 2:
			get_state_restaurant('order_12460');
			break;
		case 3:
			get_state_dealer('order_12460');
			break;
		case 4:
			exit(0);
		default:
			print("Opción inválida\n");
			break;
	}
}