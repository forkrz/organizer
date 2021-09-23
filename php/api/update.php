<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$config = require_once("../config/config.php");
require __DIR__ . '/../../vendor/autoload.php';
require '../DBdataUpdate.php';
require '../database.php';
require '../DBDataCheck.php';
require '../datavalidation.php';
$db = new Database($config);
$dbdc = new DBDataCheck($db);
$DbDU = new DBdataUpdate($db, $dbdc);
$dv = new DataValidation();

use Firebase\JWT\JWT;

$dataJWT = json_decode(file_get_contents("php://input"));
$data = json_decode(file_get_contents("php://input"), true);
$DbDU->USER_LOGIN = $dataJWT->USER_LOGIN;
$DbDU->USER_ID = $dataJWT->USER_ID;
$DbDU->EMAIL = $dataJWT->EMAIL;
$DbDU->USER_PASSWORD = $dataJWT->USER_PASSWORD;
$DbDU->USER_CONFIRM_PASSWORD = $dataJWT->USER_CONFIRM_PASSWORD;

$jwt = isset($dataJWT->jwt) ? $dataJWT->jwt : "";
$key = "example_key";

if ($jwt) {
    if ($dv->UpdateDataTotalCheck($DbDU->USER_LOGIN, $DbDU->EMAIL, $DbDU->USER_PASSWORD, $DbDU->USER_CONFIRM_PASSWORD)) {
    } else {
        http_response_code(401);
        echo json_encode(array(
            "message" => "Access denied."
        ));
        exit;
    }
}


if ($dbdc->paramDBexistCheck('USER_LOGIN', $data->user_login) === false || $dbdc->paramDBexistCheck('EMAIL', $data->EMAIL) === false) {
} else {
    http_response_code(409);

    echo json_encode(array("message" => "Login or email already exists in database."));
    exit();
}


if ($jwt) {

    try {
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        if ($DbDU->updateRecord()) {

            $issued_at = time();
            $expiration_time = $issued_at + (60 * 60);
            $issuer = 'http://org.localhost/php/api/login.php';
            $key = "example_key";

            $token = array(
                "iat" => $issued_at,
                "exp" => $expiration_time,
                "iss" => $issuer,
                "data" => array(
                    "user_id" => $data['USER_ID']
                )
            );


            $jwtToken = JWT::encode($token, $key);
            http_response_code(200);
            echo json_encode(
                array(
                    "message" => "Successful login.",
                    "jwt" => $jwtToken
                )
            );
        }


        // message if unable to update user
        else {
            // set response code
            http_response_code(401);

            // show error message
            echo json_encode(array("message" => "Unable to update user."));
        }
    } catch (Exception $e) {

        http_response_code(401);

        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
} else {

    http_response_code(401);
    echo json_encode(array("message" => "Access denied."));
}