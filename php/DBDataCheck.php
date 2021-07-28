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
    private function getPasswordFromDB($login)
    {
        $stmt = $this->db->con->prepare('SELECT USER_PASSWORD FROM users WHERE USER_LOGIN' . ' =?');
        $stmt->bindParam(1, $login, PDO::FETCH_ASSOC);
        $stmt->execute();
        $row = $stmt;
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row["USER_PASSWORD"];
    }

    public function getParamFromDB($param, $login)
    {
        $stmt = $this->db->con->prepare('SELECT ' . $param . ' FROM users WHERE USER_LOGIN' . ' =?');
        $stmt->bindParam(1, $login, PDO::FETCH_ASSOC);
        $stmt->execute();
        $row = $stmt;
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row[$param];
    }

    public function passwordCheck($login, $userPassword)
    {
        $passwordDB = ($this->getPasswordFromDB($login));
        return password_verify($userPassword, $passwordDB);
    }
    public function paramCheck($param, $login, $userParam)
    {
        $paramDB = $this->getParamFromDB($param, $login);

        return $paramDB == $userParam;
    }
}