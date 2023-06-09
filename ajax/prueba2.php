<?php
	header("access-control-allow-origin: *");

	 $datos[] = array("texto" => "Exito",
	 "customer_id" => "customer",
	 "orde_id" => "order");


	// Encoding array in JSON format
	echo json_encode($datos);

?>

