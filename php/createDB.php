<?php

declare(strict_types=1);



require_once("../database.php");

class CreateDB
{
    function __construct($db, $dbdc)
    {
        $this->db = $db;
        $this->dbdc = $dbdc;
    }
    public function createUser($mailHash)
    {
        $query = "INSERT INTO USERS 
            SET 
            user_login=:user_login, email=:email, user_password=:user_password, mail_hash=:mail_hash";

        $stmt = $this->db->con->prepare($query);



        $this->user_login = htmlspecialchars(strip_tags($this->user_login));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->user_password = htmlspecialchars(strip_tags($this->user_password));
        $this->user_password = password_hash($this->user_password, PASSWORD_DEFAULT);



        $stmt->bindParam(':user_login', $this->user_login);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":user_password", $this->user_password);
        $stmt->bindParam(":mail_hash", $mailHash);
        if ($stmt->execute()) {
            return True;
        }
        return FALSE;
    }

    public function addNote($title, $text, $userID)
    {
        $query = "INSERT INTO user_notes 
        SET 
        note_title=:note_title, note_text=:note_text, user_id=:user_id";

        $stmt = $this->db->con->prepare($query);
        $title = htmlspecialchars(strip_tags($title));
        $text = htmlspecialchars(strip_tags($text));
        $userID = htmlspecialchars(strip_tags($userID));

        $stmt->bindParam(':note_title', $title);
        $stmt->bindParam(':note_text', $text);
        $stmt->bindParam(':user_id', $userID);

        if ($stmt->execute()) {
            return True;
        }
        return FALSE;
    }
}