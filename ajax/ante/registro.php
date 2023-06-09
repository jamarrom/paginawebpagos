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


	$cone = connect_to_SMBD();
	bd_selection($cone);

	$datosRegistro = json_decode($_POST['datosRegistro']);

	guardarPersona($cone,$datosRegistro,"No");

	echo "Exito";

	close_DB($cone);
?>