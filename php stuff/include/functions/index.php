<?php

define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
define('DB_NAME', 'registro');

// session_name("secure");

$database = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASSWORD);

date_default_timezone_set('Europe/Rome');

function error($text){
	$html = '<p>' . $text . '</p>';
	return $html;
}

function success($text){
	$html = '<p>' . $text . '</p>';
	return $html;
}

function getUser($id){
    global $database;
    $db = $database->prepare("SELECT * FROM users WHERE id=?");
    $db->execute(array($id));
    $rows = $db->fetchAll(PDO::FETCH_ASSOC);
	$user = $rows[0];
    $username  = $user['username'];
	$create_date  = $user['create_date'];
	return $rows[0];
}


function login($username, $password){
    global $database;
    $db = $database->prepare("SELECT * FROM users WHERE email=? OR  username=?");
    $db->execute(array($email, $username));
    $rows = $db->fetchAll(PDO::FETCH_ASSOC);
    $real_password = ($rows[0]['password']);
    if($password == $real_password){
        session_start();
        $_SESSION['logged_in'] = "1";
		$_SESSION['id'] = $rows[0]['id'];
		$_SESSION['username'] = $rows[0]['username'];
        return success("Logged in successfully!\nRedirecting..");
    } else {
        return error("Wrong credentials!");
    }
}

function getImpostazioni(){
	global $database;
	$db = $database->prepare("SELECT * FROM impostazioni WHERE id = 1");
	$db->execute();
	$rows = $db->fetchAll(PDO::FETCH_ASSOC);
	$settings = $rows[0];
	return $settings;
}