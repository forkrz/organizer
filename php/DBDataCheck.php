<?php

declare(strict_types=1);

class DBDataCheck
{
    function __construct($db)
    {
        $this->db = $db;
    }
    private function paramDBFetch($param, $userInput)
    {
        $stmt = $this->db->con->prepare('SELECT * FROM users WHERE ' . $param . ' =?');
        $stmt->bindParam(1, $userInput, PDO::FETCH_ASSOC);
        $stmt->execute();
        $row = $stmt;
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row;
    }
    public function paramDBexistCheck($param, $userInput)
    {
        if ($this->paramDBFetch($param, $userInput)) {
            return true;
        } else {
            return false;
        }
    }
    // private function getPasswordFromDB($login)
    // {
    //     $stmt = $this->db->con->prepare('SELECT USER_PASSWORD FROM users WHERE USER_LOGIN' . ' =?');
    //     $stmt->bindParam(1, $login, PDO::FETCH_ASSOC);
    //     $stmt->execute();
    //     $row = $stmt;
    //     $row = $stmt->fetch(PDO::FETCH_ASSOC);
    //     return $row["USER_PASSWORD"];
    // }

    // public function getParamFromDB($param, $login)
    // {
    //     $stmt = $this->db->con->prepare('SELECT ' . $param . ' FROM users WHERE USER_LOGIN' . ' =?');
    //     $stmt->bindParam(1, $login, PDO::FETCH_ASSOC);
    //     $stmt->execute();
    //     $row = $stmt;
    //     $row = $stmt->fetch(PDO::FETCH_ASSOC);
    //     return $row[$param];
    // }

    public function getParamFromDBv2($paramSelect, $paramWhere, $userInput)
    {
        $stmt = $this->db->con->prepare('SELECT ' . $paramSelect . ' FROM users WHERE ' . $paramWhere . ' =?');
        $stmt->bindParam(1, $userInput, PDO::FETCH_ASSOC);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row[$paramSelect];
    }

    public function passwordCheck($paramSelect, $paramWhere, $userInput, $user_passwsord)
    {
        $passwordDB = ($this->getParamFromDBv2($paramSelect, $paramWhere, $userInput));
        return password_verify($user_passwsord, $passwordDB);
    }
    public function paramCheck($paramSelect, $paramWhere, $userInput, $inputTocheck)
    {
        $paramDB = $this->getParamFromDBv2($paramSelect, $paramWhere, $userInput);
        return $paramDB == $inputTocheck;
    }




    // private function getHashfromDB(string $hash)
    // {
    //     $stmt = $this->db->con->prepare('SELECT MAIL_HASH FROM users WHERE MAIL_HASH=?');
    //     $stmt->bindParam(1, $hash, PDO::FETCH_ASSOC);
    //     $stmt->execute();
    //     $row = $stmt;
    //     $row = $stmt->fetch(PDO::FETCH_ASSOC);
    //     return $row['MAIL_HASH'];
    // }

    // private function doHashExistsInDB(string $hash)
    // {
    //     if (!empty($this->getHashfromDB($hash))) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


    // public function hashToDB(string $hash, string $login)
    // {
    //     $hash = md5(uniqid($login, true));
    //     return $hash;
    // }
}