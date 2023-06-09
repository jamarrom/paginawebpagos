<?php
	require_once '../bd/conexion.php';
	require_once '../modelos/bdModelo.php';  
	require_once '../modelos/personasModelo.php';
	require_once '../modelos/asociadosModelo.php';
	require_once '../modelos/acompanantesModelo.php';
	require_once '../modelos/costosModelo.php';
	require_once '../modelos/grupalesModelo.php';

	include "../scriptCR/qrlib.php"; 
	include('../PHPMailer/class.phpmailer.php');
	include('../PHPMailer/class.smtp.php');

	require_once("../lib/Conekta.php");
	\Conekta\Conekta::setApiKey("key_WxXWR8fbTHPZVkaPY18dvQ");
	\Conekta\Conekta::setApiVersion("2.0.0");

	$cone = connect_to_SMBD();
	bd_selection($cone);

	$listaRegistro = json_decode($_POST['listRegistros']);

	$total = consultarPrecioGrupal($cone);	

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
					"name" => $listaRegistro[0]->nombreCompleto,
					"email" => $listaRegistro[0]->email,
					"phone" => "+52".$listaRegistro[0]->telefono
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

		$id_persona = "";

		for($a=0; $a < count($listaRegistro); $a++)
		{
			if($a==0)
				$id_persona = guardarPersonaGrupal($cone,$listaRegistro[$a],$a,$id_persona,"No");
			else
				guardarPersonaGrupal($cone,$listaRegistro[$a],$a,$id_persona,"No");
		}
		


		$datos['referencia'] = $order->charges[0]->payment_method->receiving_account_number;
		$datos['monto'] = 	$order->line_items[0]->unit_price/100;

		echo json_encode($datos);

	  
	  } catch (\Conekta\ParameterValidationError $error){
		echo $error->getMessage();
	  } catch (\Conekta\Handler $error){
		echo $error->getMessage();
	  }
?>