<?php

header("Access-Control-Allow-Origin: http://localhost/rest-api-authentication-example/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once('../database.php');
require_once('../DBDataCheck.php');
require_once('../DBdataUpdate.php');
$config = require_once('../config/config.php');

$db = new Database($config);
$dbdc = new DBDataCheck($db);
$dbdu = new DBdataUpdate($db, $dbdc);

$data = json_decode(file_get_contents("php://input"));
if ($dbdc->paramDBexistCheck('MAIL_HASH', $data->hash)) {
} else {
    http_response_code(400);
    echo json_encode(array("message" => "string doesn't exist in DB"));
    exit();
}



if ($dbdc->paramCheck('MAIL_CONFIRMATION', 'MAIL_HASH', $data->hash, '1')) {
    http_response_code(400);
    echo json_encode(array("message" => "account has been already activated."));
    exit();
} else {
}


if ($dbdu->accountActivation($data->hash)) {
    http_response_code(201);
    echo json_encode(array("message" => "account has been activated."));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to actvate account."));
}