<?php
	require_once '../bd/conexion.php';
	require_once '../modelos/bdModelo.php';
	require_once '../modelos/ventasModelo.php';
	require_once '../modelos/detalleVentaModelo.php';
	require_once '../modelos/personasModelo.php';	

	include('../PHPMailer/class.phpmailer.php');
	include('../PHPMailer/class.smtp.php');
	
	enviarCorreoDeCompra("Juan Antonio Martínez Román","juanantonio@tobe.mx","Chocotour, Chocotour, Chocotour","743.75","","");
?>