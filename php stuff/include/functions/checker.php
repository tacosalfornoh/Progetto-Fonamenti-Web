<?php
include('index.php');
error_reporting(0);

$action = key($_GET);
switch ($action){
    case "doLogin":
        $username = $_POST['username'];
        $password = $_POST['password'];
        echo login($username, $password);
        break;
}
?>