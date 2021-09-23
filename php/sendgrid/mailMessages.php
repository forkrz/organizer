<?php

class MailMessages
{

    public function mailText($mailHash)
    {
        $mailText = array(
            'register' => array(
                'header' => 'activation link || Fornalizer',
                'content' => "Hi<br>Please click below link to acrivate your account:<br><a href='http://org.localhost/mailConfirmation.html?hash=$mailHash'>Link</a>"
            )
        );
        return $mailText;
    }
}