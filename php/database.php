<?php

declare(strict_types=1);

class Database
{
    function __construct($config)
    {
        try {
            $dsn = "mysql:host={$config['host']};dbname={$config['dbname']}";
            $this->con = new PDO($dsn, $config['user'], $config['password']);
            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connected successfully";
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
$config = require_once("../php/config/db.php");
print_r($config);
$db = new Database($config);