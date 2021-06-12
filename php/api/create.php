<?php

require_once("../database.php");
$config = require_once("../config/config.php");
require_once("../createDB.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db = new Database($config);
$createDb = new CreateDB($db);

$data = json_decode(file_get_contents("php://input"));
if (
    !empty($data->user_login) &&
    !empty($data->email) &&
    !empty($data->user_password)
) {
    $createDb->user_login = $data->user_login;
    $createDb->email = $data->email;
    $createDb->user_password = $data->user_password;

    if ($createDb->createUser()) {
        http_response_code(201);
        echo json_encode(array("message" => "account has been created."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create account."));
    }
} else {

    http_response_code(400);

    echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
}