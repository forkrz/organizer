<?php
require __DIR__ . '/../../vendor/autoload.php';
require_once "config.php";

class mailSender
{
    public function sendMail(string $subject, string $userEmail, string $login, string $message)
    {
        function __construct()
        {
        }

        $email = new \SendGrid\Mail\Mail();
        $email->setFrom("forkrz8@gmail.com", "Fornalizer");
        $email->setSubject($subject);
        $email->addTo($userEmail, $login);
        $email->addContent(
            "text/html",
            $message
        );
        $sendgrid = new \SendGrid(SENDGRID_API_KEY);
        try {
            $sendgrid->send($email);
        } catch (Exception $e) {
            echo 'Caught exception: ' . $e->getMessage() . "\n";
        }
    }
}