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

	$cone = connect_to_SMBD();
	bd_selection($cone);

	$listaRegistro = json_decode($_POST['listRegistros']);

	
	$id_persona = "";

	for($a=0; $a < count($listaRegistro); $a++)
	{
		if($a==0)
			$id_persona = guardarPersonaGrupal($cone,$listaRegistro[$a],$a,$id_persona,"No");
		else
			guardarPersonaGrupal($cone,$listaRegistro[$a],$a,$id_persona,"No");
	}

	echo "Exito";
		
	close_DB($cone);
?>