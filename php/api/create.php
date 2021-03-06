<?php

require_once("../database.php");
$config = require_once("../config/config.php");
require_once("../createDB.php");
require_once('../dataValidation.php');
require_once('../Dbdatacheck.php');
require_once('../api/apiHandler.php');
require_once('../sendgrid/mailSender.php');
require_once('../sendgrid/mailMessages.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db = new Database($config);
$dbdc = new DBDataCheck($db);
$createDb = new CreateDB($db, $dbdc);
$dv = new DataValidation();
$ah = new apiHandler();
$mmsgs = new MailMessages();

$ms = new mailSender();

$data = json_decode(file_get_contents("php://input"));

if ($ah->isRegisterDataNotEmpty($data)) {
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Unable to create account. Data is incomplete."));
    exit();
}

if ($dbdc->paramDBexistCheck('USER_LOGIN', $data->user_login) === false) {
} else {
    http_response_code(409);

    echo json_encode(array("message" => "Login or email already exists in database."));
    exit();
}

if ($dbdc->paramDBexistCheck('EMAIL', $data->email) === false) {
} else {
    http_response_code(409);

    echo json_encode(array("message" => "Login or email already exists in database."));
    exit();
}
$createDb->user_login = $data->user_login;
$createDb->email = $data->email;
$createDb->user_password = $data->user_password;
$createDb->user_confirm_password = $data->user_confirm_password;

if ($dv->RegisterDataTotalCheck($createDb->user_login, $createDb->email, $createDb->user_password, $createDb->user_confirm_password)) {
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to create account."));
    exit();
}

$mailHash = md5(uniqid($data->user_login, true));

if ($createDb->createUser($mailHash)) {
    $ms->sendMail($mmsgs->mailText($mailHash)['register']['header'], $data->email, $data->user_login, $mmsgs->mailText($mailHash)['register']['content']);
    http_response_code(201);
    echo json_encode(array("message" => "account has been created."));
    exit();
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to create account."));
    exit();
}