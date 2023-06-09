<?php
	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	require_once dirname(__FILE__) . '/vendor/autoload.php';
	//require(dirname(__FILE__) . '/Openpay/Openpay.php');

	use Openpay\Data\Openpay;
	use OpenPay\Data\OpenpayApiRequestError;

	/*$openpay = Openpay::getInstance('mlgazpb4rfr5oy4frt0d', 'sk_5be90c086e724deb832f70447d3c5685', 'MX');

	Openpay::setProductionMode(false);*/

	$openpay = Openpay::getInstance('mc2lujsx0twl7jcqwbdr', 'sk_8a3c85f43aba4051b0df58b1625dcaea', 'MX');

	Openpay::setProductionMode(false);

	$c_id = $_POST['customer_id'];
	$t_id = $_POST['transccion_id'];

	try {
		$customer = $openpay->customers->get($c_id);
		$charge = $customer->charges->get($t_id);

		/*$charge = $openpay->charges->create($chargeData);*/

		$datos[] = array("status" => $charge->status);

		echo json_encode($datos);


		//failed
		//completed
	} catch (OpenpayApiRequestError $th) {
		//echo 'el pepe';
		throw $th;
	}
?>