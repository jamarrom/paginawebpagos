<?php
	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	require_once dirname(__FILE__) . '/vendor/autoload.php';
	//require(dirname(__FILE__) . '/Openpay/Openpay.php');

	use Openpay\Data\Openpay;
	use OpenPay\Data\OpenpayApiRequestError;
    
	$openpay = Openpay::getInstance('mlgazpb4rfr5oy4frt0d', 'sk_5be90c086e724deb832f70447d3c5685', 'MX');

	Openpay::setProductionMode(false);

	$datosPersona = json_decode($_POST['dataPersona']);
	$total = ($_POST['totalCompra']);

	$customerData = array(
		'name' => $_POST['txtTitular'],
		'last_name' => ' ',
		'email' => $datosPersona->email,
		'phone_number' => '+52'.$datosPersona->telefono
	);
	$customer = $openpay->customers->add($customerData);

	try {
		/*$cardData = array(
			'holder_name' => $_POST['txtTitular'],
			'card_number' => $_POST['card_number'],
			'cvv2' => $_POST['cvv2'],
			'expiration_month' => $_POST['expiration_month'],
			'expiration_year' => $_POST['expiration_year'],
			 'device_session_id' => $_POST['device_session_id']
		);
	
		$customer = $openpay->customers->get($customer->id);
		$card = $customer->cards->add($cardData);*/
		
		$chargeData = array(
			'source_id' => $_POST['source_id'],
			'method' => 'card',
			'amount' => $total,
			'currency' => 'MXN',
			'description' => 'Compra de: '.$_POST['listaComprar'],
			'order_id' => 'acxede-'.$_POST['source_id'],
			'device_session_id' => $_POST['device_session_id']
		);
		
		$customer = $openpay->customers->get($customer->id);  
		$charge = $customer->charges->create($chargeData);
	
		$datos[] = array("texto" => "Exito",
			"customer_id" => $customer->id,
			"orde_id" => $customer->id);

		echo json_encode($datos);
	
	} catch (OpenpayApiRequestError $th) {
		//echo 'el pepe';
		throw $th;
	}
	

	/*
	$total = intval(($_POST['totalCompra']*100));
	//echo $total."---";

	$datosPersona = json_decode($_POST['dataPersona']);

	//echo "Aquí".$datosCompra[0]->token."->"; 
		try {
			$customer = \Conekta\Customer::create(
				array(
					'name'  => $_POST['txtTitular'],
					'email' => $datosPersona->email,
					'phone' => "+52".$datosPersona->telefono,
					'payment_sources' => array(array(
						'token_id' => $_POST['txtKo'],
						'type' => "card"
					)),
					"antifraud_info" => array(
						"account_created_at" => 1643920208,
						"first_paid_at" => 1641499560,
						"paid_transactions" => 1
					)
				)
			);

		} catch (\Conekta\ProccessingError $error){
			echo $error->getMesage(); 
		} catch (\Conekta\ParameterValidationError $error){
			echo $error->getMessage()." ".$_POST['txtTitular']." ".$datosPersona->email." ".$datosPersona->telefono." ".$_POST['txtKo'];
		} catch (\Conekta\Handler $error){
			echo $error->getMessage();
		}

		try{
			$order = \Conekta\Order::create(array(
				'currency' => 'MXN',
				'customer_info' => array(
					'customer_id' => $customer['id'],
					"antifraud_info" => array(
						"paid_transactions" => 1
					)
				),
				'line_items' => array(
					array(
					'name' => 'Compra de: '.$_POST['listaComprar'],
					'unit_price' => $total,
					'quantity' => 1,
					"antifraud_info" => array(
						"trip_id" => "12345",
						"driver_id" => "driv_1231",
						"ticket_class" => "economic",
						"pickup_latlon" => "23.4323456,-123.1234567",
						"dropoff_latlon" => "23.4323456,-123.1234567"
						)
					)
				),
				'charges' => array(
					array(
					'payment_method' => array(
						'token_id' => $_POST['txtKo'],
						'type' => 'default'
					)
					)
				)
			));
			$datos[] = array("texto" => "Exito",
			"customer_id" => $customer['id'],
			"orde_id" => $order['id']);

			echo json_encode($datos);

		} catch (\Conekta\ProcessingError $error){
		echo $error->getMessage();
		} catch (\Conekta\ParameterValidationError $error){
		echo $error->getMessage();
		} catch (\Conekta\Handler $error){
		echo $error->getMessage();
		}
*/
?>