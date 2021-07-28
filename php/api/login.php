<?php
require __DIR__ . '/../../vendor/autoload.php';

use Firebase\JWT\JWT;

require_once("../database.php");
$config = require_once("../config/config.php");
require_once("../createDB.php");
require_once('../dataValidation.php');
require_once('../Dbdatacheck.php');




header("Access-Control-Allow-Origin: http://localhost/rest-api-authentication-example/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db = new Database($config);
$createDb = new CreateDB($db);
$dv = new DataValidation();
$dbdc = new DBDataCheck($db);
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->USER_LOGIN && $data->USER_PASSWORD)
) {
    $dbdc->USER_LOGIN = $data->USER_LOGIN;
    $dbdc->USER_PASSWORD = $data->USER_PASSWORD;
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Unable to login. Data is incomplete."));
    exit();
}



if ($dbdc->paramDBexistCheck('USER_LOGIN', $dbdc->USER_LOGIN) && $dbdc->passwordCheck($dbdc->USER_LOGIN, $dbdc->USER_PASSWORD)) {

    $issued_at = time();
    $expiration_time = $issued_at + (600 * 600);
    $issuer = 'http://org.localhost/php/api/login.php';
    $key = "example_key";

    $token = array(
        "iat" => $issued_at,
        "exp" => $expiration_time,
        "iss" => $issuer,
        "data" => array(
            "user_login" => $dbdc->USER_LOGIN,
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
} else {
    http_response_code(401);
    echo json_encode(array("message" => "Login failed."));
};