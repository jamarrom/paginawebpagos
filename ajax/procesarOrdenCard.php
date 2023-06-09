<?php
	require_once("../lib/Conekta.php");
	\Conekta\Conekta::setApiKey("key_VwYgGq7ZjBszfSVMNs9gWQ");
	//\Conekta\Conekta::setApiKey("key_4JUr8eNMkqjKM7J7iuh5MA");
	\Conekta\Conekta::setApiVersion("2.0.0");
	\Conekta\Conekta::setLocale('es');

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

?>