<?php

declare(strict_types=1);

require_once("../php/database.php");

class RecivePost
{
    function __construct($db)
    {
        $this->db = $db;
    }
    public function registerArray()
    {
        $registerArray = array(
            "username" => $_POST["username"],
            "email" => $_POST["email"],
            "password" => $_POST["password"],
        );
        return $registerArray;
    }
}