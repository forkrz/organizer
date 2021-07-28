<?php

declare(strict_types=1);

class apiHandler
{

    public function isRegisterDataNotEmpty($data)
    {
        if (
            !empty($data->user_login) &&
            !empty($data->email) &&
            !empty($data->user_password) &&
            !empty($data->user_confirm_password)
        ) return true;
        else {
            return false;
        }
    }
    public function isLoginDataNotEmpty($data)
    {
        if (
            !empty($data->user_login) &&
            !empty($data->email)
        )
            return true;
        else {
            return false;
        }
    }
}