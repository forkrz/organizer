<?php

class DBdataUpdate
{

    function __construct($db, $dbdc)
    {
        $this->db = $db;
        $this->dbdc = $dbdc;
    }

    public function isPasswordNeedToBeUpdated($paramSelect, $paramWhere, $userInput,)
    {
        if (!$this->dbdc->passwordCheck($paramSelect, $paramWhere, $userInput, $this->USER_PASSWORD) || !$userInput == '') {

            return true;
        } else {
            return false;
        }
    }
    public function isParamNeedToBeUpdated($paramSelect, $paramWhere, $userInput, $inputTocheck)
    {
        if (!$inputTocheck == '') {
            if ($this->dbdc->paramCheck($paramSelect, $paramWhere, $userInput, $inputTocheck)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }


    public function paramsToUpdateArray()
    {
        $array = array(
            $this->isParamNeedToBeUpdated('USER_LOGIN', 'USER_ID', $this->USER_ID, $this->USER_LOGIN),
            $this->isParamNeedToBeUpdated('EMAIL', 'USER_ID', $this->USER_ID, $this->EMAIL),
            $this->isPasswordNeedToBeUpdated('USER_PASSWORD', 'USER_ID', $this->USER_ID)
        );
        return $array;
    }





    public function updateRecord()
    {
        $loginFromDB = $this->dbdc->getParamFromDBv2('USER_LOGIN', 'USER_ID', $this->USER_ID);
        $emailFromDB = $this->dbdc->getParamFromDBv2('EMAIL', 'USER_ID', $this->USER_ID);
        $passwordFromDB = $this->dbdc->getParamFromDBv2('USER_PASSWORD', 'USER_ID', $this->USER_ID);
        $query = "UPDATE users SET
        USER_LOGIN = :USER_LOGIN,
        EMAIL = :EMAIL,
        USER_PASSWORD = :USER_PASSWORD
        Where USER_ID = $this->USER_ID";
        $stmt = $this->db->con->prepare($query);
        if ($this->isParamNeedToBeUpdated('USER_LOGIN', 'USER_ID', $this->USER_ID, $this->USER_LOGIN)) {
            $this->USER_LOGIN = htmlspecialchars(strip_tags($this->USER_LOGIN));
            $stmt->bindParam(":USER_LOGIN", $this->USER_LOGIN);
        } else {
            $stmt->bindParam(":USER_LOGIN", $loginFromDB);
        }

        if ($this->isParamNeedToBeUpdated('EMAIL', 'USER_ID', $this->USER_ID, $this->EMAIL)) {
            $this->EMAIL = htmlspecialchars(strip_tags($this->EMAIL));
            $stmt->bindParam(":EMAIL", $this->EMAIL);
        } else {
            $stmt->bindParam(":EMAIL", $emailFromDB);
        }

        if ($this->isPasswordNeedToBeUpdated('USER_PASSWORD', 'USER_ID', $this->USER_ID)) {
            $password_hash = password_hash($this->USER_PASSWORD, PASSWORD_DEFAULT);
            $stmt->bindParam(':USER_PASSWORD', $password_hash);
        } else {
            $stmt->bindParam(":USER_PASSWORD", $passwordFromDB);
        }

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function accountActivation(string $hash)
    {
        $stmt = $this->db->con->prepare('Update users  SET MAIL_CONFIRMATION = TRUE WHERE MAIL_HASH =?');
        $stmt->bindParam(1, $hash);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        };
    }
}