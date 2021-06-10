<?php

declare(strict_types=1);

require_once("../php/database.php");

class CreateDB
{
    function __construct($db, $rp)
    {
        $this->db = $db;
        $this->rp = $rp;
    }
    public function registerUser()
    {
        $registerArray = $this->rp->registerArray();
        $query = "INSERT INTO USERS (LOGIN,EMAIL,PASSWORD) VALUES (?, ? , ?)";
        $stmt = $this->db->con->prepare($query);
        $stmt->execute([$registerArray['username'], $registerArray['email'], $registerArray['password']]);
    }
}