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

	try{
		$order = \Conekta\Order::create(
			array(
				"line_items" => array(
					array(
						"name" => "Congreso AMPI Oaxaca",
						"unit_price" => $total,
						"quantity" => 1
					)//first line_item
				),
				"currency" => "MXN",
				"customer_info" => array(
					"name" => $datosRegistro->nombreCompleto,
					"email" => $datosRegistro->email,
					"phone" => $datosRegistro->telefono
				), //customer_info
				"charges" => array(
						array(
								"payment_method" => array(
									"type" => "spei"
								)//payment_method
						) //first charge
				) //charges
			)//order
		);

		guardarPersona($cone,$datosRegistro,"No");

		$datos['referencia'] = $order->charges[0]->payment_method->receiving_account_number;
		$datos['monto'] = 	$order->line_items[0]->unit_price/100;

		echo json_encode($datos);

	  
	  } catch (\Conekta\ParameterValidationError $error){
		echo $error->getMessage();
	  } catch (\Conekta\Handler $error){
		echo $error->getMessage();
	  }
?>