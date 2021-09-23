<?php

require_once '../app2/php/DBDataCheck.php';
require_once '../app2/php/DBdataUpdate.php';
require_once '../app2/php/database.php';
$config = require_once("../app2/php/config/config.php");
require_once('../app2/php/sendgrid/mailMessages.php');
require '../app2/php//datavalidation.php';


require_once('../app2/vendor/autoload.php');

use Firebase\JWT\JWT;

$dv = new DataValidation();
$db = new Database($config);
$dbdc = new DBDataCheck($db);
$msgs = new MailMessages();
$dbdu = new DBdataUpdate($db, $dbdc);
$decoded = JWT::decode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzI0MDg1MDYsImV4cCI6MTYzMjQxMjEwNiwiaXNzIjoiaHR0cDpcL1wvb3JnLmxvY2FsaG9zdFwvcGhwXC9hcGlcL2xvZ2luLnBocCIsImRhdGEiOnsidXNlcl9sb2dpbiI6ImF3ZGF3ZDEyMyIsInVzZXJfaWQiOiI1NSJ9fQ.PplZcDV7KIqpmRswtCqzZoj3ReYUWIFEtiGzTr0cAX8', 'example_key', array('HS256'));
// var_dump($dbdu->isParamNeedToBeUpdated("USER_LOGIN", "USER_ID", '71', 'test123'));
// $dbdu->USER_PASSWORD = "Test1233!";
// var_dump($dbdu->isPasswordNeedToBeUpdated('USER_PASSWORD', "USER_ID", "71"));

print_r($decoded->data->user_id);