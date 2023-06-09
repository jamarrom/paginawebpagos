<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__) . '/vendor/autoload.php';
//require(dirname(__FILE__) . '/Openpay/Openpay.php');

use Openpay\Data\Openpay;
use OpenPay\Data\OpenpayApiRequestError;


// MERCHANT_ID = moiep6umtcnanql3jrxp
// PRIVATE_KEY = sk_3433941e467c1055b178ce26348b0fac
// COUNTRY_CODE = MX (México), CO (Colombia), PE (Peru)

//echo 'inicia';
// $whoops = new \Whoops\Run;
// $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
// $whoops->register();


$openpay = Openpay::getInstance('mlgazpb4rfr5oy4frt0d', 'sk_5be90c086e724deb832f70447d3c5685', 'MX');

Openpay::setProductionMode(false);

$customerData = array(
    'name' => 'Wendy',
    'last_name' => 'Perez',
    'email' => 'wendy@gmail.com',
    'phone_number' => '9931210489'
);
$customer = $openpay->customers->add($customerData);

try {
    /*$cardData = array(
        'holder_name' => 'Wendy Zapata',
        'card_number' => '4111111111111111',
        'cvv2' => '123',
        'expiration_month' => '01',
        'expiration_year' => '24',
         'device_session_id' => $_POST['device_session_id']
    );

    $customer = $openpay->customers->get($customer->id);
    $card = $customer->cards->add($cardData);*/
    
    $chargeData = array(
        'source_id' => $_POST['source_id'],
        'method' => 'card',
        'amount' => 100,
        'currency' => 'MXN',
        'description' => 'Cargo inicial a mi merchant',
        'order_id' => 'Jaoid-00053',
        'device_session_id' => $_POST['device_session_id']
    );
    
    $customer = $openpay->customers->get($customer->id);  
    $charge = $customer->charges->create($chargeData);

    echo "Listo";

} catch (OpenpayApiRequestError $th) {
    //echo 'el pepe';
    throw $th;
}