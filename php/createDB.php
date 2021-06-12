<?php

declare(strict_types=1);

require_once("../database.php");

class CreateDB
{
    function __construct($db)
    {
        $this->db = $db;
    }
    public function createUser()
    {
        $query = "INSERT INTO USERS 
            SET 
            user_login=:user_login, email=:email, user_password=:user_password";

        $stmt = $this->db->con->prepare($query);

        $this->user_login = htmlspecialchars(strip_tags($this->user_login));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->user_password = htmlspecialchars(strip_tags($this->user_password));

        $stmt->bindParam(':user_login', $this->user_login);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":user_password", $this->user_password);

        if ($stmt->execute()) {
            return True;
        }
        return FALSE;
    }
}