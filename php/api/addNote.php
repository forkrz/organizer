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
require __DIR__ . '/../../vendor/autoload.php';

use Firebase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"));


if ($dv->noteTotalCheck($data->NOTE_TITLE, $data->NOTE_TEXT)) {
} else {
    http_response_code(400);

    echo json_encode(array("message" => "Unable to create note."));
    exit();
}

$decoded = JWT::decode($data->jwt, 'example_key', array('HS256'));

if ($createDb->addNote($data->NOTE_TITLE, $data->NOTE_TEXT, $decoded->data->user_id)) {
    http_response_code(200);
    echo json_encode(array("message" => "Note added."));
} else {
    http_response_code(401);
    echo json_encode(array("message" => "Unable to add note."));
}