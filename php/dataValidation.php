<?php

declare(strict_types=1);
class DataValidation
{
    private function lengthParamValidation($param, $minLength, $maxLength)
    {
        if (strlen($param) >= $minLength && strlen($param) <= $maxLength) {
            return true;
        }
    }

    private function mailCheck($mail)
    {
        $regex = "/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i";
        if (preg_match($regex, $mail)) {
            return true;
        }
    }
    private function passwordCheck($password)
    {
        $regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/";
        if (preg_match($regex, $password)) {
            return true;
        }
    }
    private function passwordMatch($password, $confirmPassword)
    {
        if ($password === $confirmPassword) {
            return true;
        }
    }
    public function RegisterDataTotalCheck($login, $email, $password, $confirmPassword)
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
    public function LoginDataTotalCheck($login, $password)
    {
        if (
            $this->lengthParamValidation($login, 5, 18) &&
            $this->passwordCheck($password)
        ) {
            return true;
        } else {
            return false;
        }
    }

    private function lengthParamValidationUpdate($param, $minLength, $maxLength)
    {
        if ($param == '') {
            return true;
        } else {
            if (strlen($param) >= $minLength && strlen($param) <= $maxLength) {
                return true;
            } else {
                return false;
            }
        }
    }

    private function mailCheckUpdate($mail)
    {
        if ($mail == '') {
            return true;
        } else {
            $regex = "/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i";
            if (preg_match($regex, $mail)) {
                return true;
            } else {
                return false;
            }
        }
    }

    private function passwordCheckUpdate($password)
    {
        if ($password == '') {
            return true;
        } else {
            $regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/";
            if (preg_match($regex, $password)) {
                return true;
            }
        }
    }

    public function UpdateDataTotalCheck($login, $email, $password, $confirmPassword)
    {
        if (
            $this->lengthParamValidationUpdate($login, 5, 18) &&
            $this->mailCheckUpdate($email) &&
            $this->passwordCheckUpdate($password) &&
            $this->passwordMatch($password, $confirmPassword)
        ) {
            return true;
        } else {
            return false;
        }
    }

    private function titleLength($title)
    {
        if (strlen($title) > 0 && strlen($title) < 33) {
            return true;
        } else {
            return false;
        }
    }

    private function noteLength($note)
    {
        if (strlen($note) > 0 && strlen($note) < 256) {
            return true;
        } else {
            return false;
        }
    }

    public function noteTotalCheck($title, $note)
    {
        if ($this->titleLength($title) && $this->noteLength($note)) {
            return true;
        } else {
            return false;
        }
    }
}