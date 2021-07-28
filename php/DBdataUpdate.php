<?php

class DBdataUpdate
{

    function __construct($db, $dbdc)
    {
        $this->db = $db;
        $this->dbdc = $dbdc;
    }

    private function isPasswordNeedToBeUpdated($login, $userPassword)
    {
        if ($this->dbdc->passwordCheck($login, $userPassword)) {
            return $password = "";
        } else {
            return $password = 'USER_PASSWORD = :USER_PASSWORD';
        }
    }
    private function isParamNeedToBeUpdated($param, $login, $userParam)
    {
        if ($this->dbdc->paramCheck($param, $login, $userParam)) {
            return $param = "";
        } else {
            return $param = $param . '= :' . $param;
        }
    }
    private function isNewParramExistInDB($param, $login, $userParam)
    {
        return $this->dbdc->getParamFromDB($param, $login) == $userParam;
    }

    public function updateRecord($login, $userData)
    {
        $query = "UPDATE users SET
        {$this->isParamNeedToBeUpdated('EMAIL',$login,$userData['EMAIL'])},
        {$this->isPasswordNeedToBeUpdated($login,$userData['USER_PASSWORD'])}
        Where USER_LOGIN = :USER_LOGIN";


        $this->EMAIL = htmlspecialchars(strip_tags($this->EMAIL));

        $stmt = $this->db->con->prepare($query);
        $stmt->bindParam(":EMAIL", $this->EMAIL);
        $stmt->bindParam(":USER_LOGIN", $this->USER_LOGIN);


        if (!empty($this->USER_PASSWORD)) {
            $this->USER_PASSWORD = htmlspecialchars(strip_tags($this->USER_PASSWORD));
            $password_hash = password_hash($this->USER_PASSWORD, PASSWORD_BCRYPT);
            $stmt->bindParam(':USER_PASSWORD', $password_hash);
        } else {
            $stmt->bindParam(":USER_PASSWORD", $this->USER_PASSWORD);
        }
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}