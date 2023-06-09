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

	//$datosRegistro = json_decode($_POST['datosRegistro']);
	$listaRegistro = json_decode($_POST['listRegistros']);

	$total = consultarPrecioGrupal($cone);

	try {
		$customer = \Conekta\Customer::create(
			array(
				'name'  => $listaRegistro[0]->nombreCompleto,
				'email' => $listaRegistro[0]->email,
				'phone' => "+52".$listaRegistro[0]->telefono,
				'payment_sources' => array(array(
					'token_id' => "".$listaRegistro[0]->token,
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
				
				$id_persona = "";

				for($a=0; $a < count($listaRegistro); $a++)
				{
					if($a==0)
						$id_persona = guardarPersonaGrupal($cone,$listaRegistro[$a],$a,$id_persona);
					else
						guardarPersonaGrupal($cone,$listaRegistro[$a],$a,$id_persona);
				}
				
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