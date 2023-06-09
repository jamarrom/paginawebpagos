<?php
	require_once '../bd/conexion.php';
	require_once '../modelos/bdModelo.php';  
	require_once '../modelos/personasModelo.php';
	require_once '../modelos/asociadosModelo.php';
	require_once '../modelos/acompanantesModelo.php';
	require_once '../modelos/costosModelo.php';

	include "../scriptCR/qrlib.php"; 
	include('../PHPMailer/class.phpmailer.php');
	include('../PHPMailer/class.smtp.php');

	require_once("../lib/Conekta.php");
	\Conekta\Conekta::setApiKey("key_WxXWR8fbTHPZVkaPY18dvQ");
	\Conekta\Conekta::setApiVersion("2.0.0");

	$cone = connect_to_SMBD();
	bd_selection($cone);

	$datosRegistro = json_decode($_POST['datosRegistro']);

	$total = $datosRegistro->totalApagar;

	try {
		$customer = \Conekta\Customer::create(
			array(
				'name'  => $datosRegistro->nombreCompleto,
				'email' => $datosRegistro->email,
				'phone' => "+52".$datosRegistro->telefono,
				'payment_sources' => array(array(
					'token_id' => "".$datosRegistro->token,
					'type' => "card"
				))
			)
		);
		
		try{
			$order = \Conekta\Order::create(array(
				'currency' => 'MXN',
				'customer_info' => array(
					'customer_id' => $customer['id']
				),
				'line_items' => array(
					array(
					'name' => 'Congreso AMPI Oaxaca',
					'unit_price' => $total,
					'quantity' => 1
					)
				),
				'charges' => array(
					array(
					'payment_method' => array(
						'type' => 'default'
					)
					)
				)
				));
				
				guardarPersona($cone,$datosRegistro);
				
				echo "Exito";		
	
			} catch (\Conekta\ProcessingError $error){
			echo $error->getMessage();
			} catch (\Conekta\ParameterValidationError $error){
			echo $error->getMessage();
			} catch (\Conekta\Handler $error){
			echo $error->getMessage();
			}


	} catch (\Conekta\ProccessingError $error){
		echo $error->getMesage();
	} catch (\Conekta\ParameterValidationError $error){
		echo $error->getMessage();
	} catch (\Conekta\Handler $error){
		echo $error->getMessage();
	}
?>