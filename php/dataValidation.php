<?php

declare(strict_types=1);
class DataValidation
{
    public function lengthParamValidation($param, $minLength, $maxLength)
    {
        if (strlen($param) >= $minLength && strlen($param) <= $maxLength) {
            return true;
        }
    }

    public function mailCheck($mail)
    {
        $regex = "/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i";
        if (preg_match($regex, $mail)) {
            return true;
        }
    }
    public function passwordCheck($password)
    {
        $regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/";
        if (preg_match($regex, $password)) {
            return true;
        }
    }
    public function passwordMatch($password, $confirmPassword)
    {
        if ($password === $confirmPassword) {
            return true;
        }
    }
    public function DataTotalCheck($login, $email, $password, $confirmPassword)
    {
        if (
            $this->lengthParamValidation($login, 5, 18) &&
            $this->mailCheck($email) &&
            $this->passwordCheck($password) &&
            $this->passwordMatch($password, $confirmPassword)
        ) {
            return true;
        } else {
            return false;
        }
    }
}