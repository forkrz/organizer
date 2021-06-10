<?php

declare(strict_types=1);

require_once("../php/database.php");

class RecivePost
{
    function __construct($db)
    {
        $this->db = $db;
    }
    private function registerArray()
    {
        $registerArray = array(
            "username" => $_POST["username"],
            "email" => $_POST["email"],
            "password" => $_POST["password"],
        );
        return $registerArray;
    }
    public function registerUser()
    {
        $registerArray = $this->registerArray();
        $query = "INSERT INTO USERS (LOGIN,EMAIL,PASSWORD) VALUES (?, ? , ?)";
        $stmt = $this->db->con->prepare($query);
        $stmt->execute([$registerArray['username'], $registerArray['email'], $registerArray['password']]);
    }
}

$config = require_once("../php/config/config.php");
$db = new Database($config);
$rp = new RecivePost($db);
$rp->registerUser();