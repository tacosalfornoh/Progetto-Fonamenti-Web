<?php

define('DB_USER', 'USERNAME');
define('DB_PASSWORD', 'PASSWORD');
define('DB_HOST', 'localhost');
define('DB_NAME', 'NAME');



///////////////////
////DO NOT EDIT////
///////////////////

session_name("secure");
session_start();

$db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASSWORD);
date_default_timezone_set('Europe/Rome');
$key = "28682ecb41c022e5b88686138e40e1d8";
$default_membership = 0;

foreach($_POST as $value){
 if(htmlspecialchars($value) != $value){
  die(error("Invalid characters."));
 }
}

error_reporting(0);


function error($text){
	$html = '
																			<div class="alert alert-danger bg-danger" style="border: none;">
										<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
										<b>Error!</b>   ' . $text . '
									</div>';
	return $html;
}

function getRole(){
	global $_SESSION;
	$user = getUser($_SESSION['id']);
	if($user['rank'] == 1){
		return "Administrator";
	} else {
		return "User";
	}
}

function success($text){
	$html = '
																			<div class="alert alert-success bg-success" style="border: none;">
										<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
										<b>Done!</b>   ' . $text . '
									</div>';
	return $html;
}

function loggedIn(){
    session_start();
    if(isset($_SESSION['id']) && $_SESSION['logged_in'] == "1"){
        return true;
    } else {
        return false;
    }
}

function xss_filter($string){
	return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}




function already_registered($email, $username){
    global $db;
    $stmt = $db->prepare("SELECT * FROM users WHERE email=? OR username=?");
    $stmt->execute(array($email, $username));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if($rows[0] != null){
        return true;
    } else {
        return false;
    }
}

function getDateString($time){
    $string = date("d-M-Y g:i A", $time);
    return $string;
}

function getDateStringShort($time){
    $string = date("d/m", $time);
    return $string;
}

function getDateStringMonth($time){
    $string = date("M", $time);
    return $string;
}

function getDateStringDay($time){
    $string = date("d", $time);
    return $string;
}

function getGenerators(){
    global $db;
    $stmt = $db->prepare("SELECT * FROM generators WHERE private = 0");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows;
}

function getAllGenerators(){
    global $db;
    $stmt = $db->prepare("SELECT * FROM generators");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows;
}

function getPrivateGenerators(){
    global $db;
    $stmt = $db->prepare("SELECT * FROM generators WHERE private = 1");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows;
}

function getNews(){
    global $db;
    $stmt = $db->prepare("SELECT * FROM news ORDER BY time DESC LIMIT 7");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows;
}

function getUser($id){
    global $db;
    $stmt = $db->prepare("SELECT * FROM users WHERE id=?");
    $stmt->execute(array($id));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$user = $rows[0];
	$today_date  = $user['today_date'];
	if($today_date != getCurrentDate()){
		$stmt = $db->prepare("UPDATE users SET today_date = ?, today_count = ?, private_count = ? WHERE id = ?");
        $stmt->execute(array(getCurrentDate(), 0, 0, $id));
	}
	$stmt = $db->prepare("SELECT * FROM users WHERE id=?");
    $stmt->execute(array($id));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows[0];
}

function getUsers($id){
    global $db;
    $stmt = $db->prepare("SELECT * FROM users");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows;
}

function updateEmail($email, $userid){
    global $db;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        return error("Invalid Email.");
    }
    $stmt = $db->prepare("SELECT * FROM users WHERE email=?");
    $stmt->execute(array($email));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	if($rows[0] != null){
		return error("This email is already used.");
	}
	
	$stmt = $db->prepare("UPDATE users SET email = ? WHERE id = ?");
    $stmt->execute(array($email, $userid));
	return success("Email updated successfully!");
}


function updateUser($userid, $email, $password, $membership){
    global $db;
	if(isAdmin() !== true){
		return null;
	}
	
	if(strlen($password) < 1){
		$password = getUser($userid)['password'];
	} else {
		$password= hash_password($password);
	}
	if($membership != "null"){
		setMembership($userid, $membership);
		$username = getUser($userid)['username'];
		$membership = getPlan($membership);
		$membership_name = $membership['name'];
		$expire_date = getUser($userid)['expire'];
		$expire_date = getDateString($expire_date);
		$membership_text = "\nThe membership of $username was been updated to $membership_name\nExpire: $expire_date";
	}
    $stmt = $db->prepare("UPDATE users SET email = ?, password = ? WHERE id = ?");
    $stmt->execute(array($email, $password, $userid));
	return success("User details updated successfully!" . $memberhip_text);
}

function setMembership($userid, $membershipid){
    global $db;
	$membership = getPlan($membershipid);
	$expire = time() + $membership['duration'];
    $stmt = $db->prepare("UPDATE users SET membership = ?, expire = ? WHERE id = ?");
    $stmt->execute(array($membershipid, $expire, $userid));
	return true;
}

function generatorLog($userid, $alt, $generator_id){
	global $db;
	$stmt = $db->prepare("INSERT INTO logs (id, user_id, alt, generator) VALUES (NULL, ?, ?, ?);");
    $stmt->execute(array($userid, $alt, $generator_id));
}


function updatePassword($userid, $oldpassword, $password, $rpassword){
    global $db;
	$old_password_hash = getUser($userid)['password'];
	$old_password_hash_in = hash_password($oldpassword);
    if ($old_password_hash != $old_password_hash_in){
        return error("Incorrect old password.");
    }
	if (strlen($password) < 6){
        return error("The password must be 6 characters long or more!");
    }
    if($password != $rpassword){
		return error("Password mismatch.");
	}
	$stmt = $db->prepare("UPDATE users SET password = ? WHERE id = ?");
    $stmt->execute(array(hash_password($password), $userid));
	return success("Password updated successfully!");
}

function isAdmin(){
    global $db;
	$id = $_SESSION['id'];
    $stmt = $db->prepare("SELECT * FROM users WHERE id=?");
    $stmt->execute(array($id));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$admin = $rows[0]['rank'] == 1;
	return $admin;
}

function getPlans(){
	global $db;
    $stmt = $db->prepare("SELECT * FROM plans WHERE id <> 0");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows;
}

function getPlan($id){
	global $db;
    $stmt = $db->prepare("SELECT * FROM plans WHERE id = ?");
    $stmt->execute(array($id));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows[0];
}


function createTicket($userid, $text, $title){
	if(strlen($text) > 250){
		return error("The message is too long!");
	}
	if(strlen($text) < 10){
		return error("The message is too short!");
	}
	if(strlen($title) > 30){
		return error("The title is too long!");
	}
	if(strlen($title) < 3){
		return error("The title is too short!");
	}
    global $db;
    $stmt = $db->prepare("INSERT INTO tickets (id, user_id, text, time, title) VALUES (NULL, ?, ?, ?, ?)");
    $stmt->execute(array($userid, $text, time(), $title));
	return success("New ticket created successfully!");
}

function replyTicket($userid, $text, $reply){
	if(strlen($text) > 250){
		return error("The message is too long!");
	}
	if(strlen($text) < 10){
		return error("The message is too short!");
	}
    global $db;
	$stmt = $db->prepare("SELECT * FROM tickets WHERE id = ?");
    $stmt->execute(array($reply));
    $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$ticket = $tickets[0];
	if(isAdmin() !== true){
		if($ticket['user_id'] != $_SESSION['id']){
			return null;
		}
	}
	
    $stmt = $db->prepare("INSERT INTO tickets (id, user_id, text, time, reply_to) VALUES (NULL, ?, ?, ?, ?)");
    $stmt->execute(array($userid, $text, time(), $reply));
	return success("Reply sent successfully!");
}

function getUserTickets($userid){
	global $db;
	$stmt = $db->prepare("SELECT * FROM tickets WHERE user_id=? AND reply_to IS NULL ORDER BY time DESC");
    $stmt->execute(array($userid));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows;
}

function getTickets(){
	global $db;
	if(isAdmin() !== true){
		return null;
	}
	$stmt = $db->prepare("SELECT * FROM tickets WHERE reply_to IS NULL ORDER BY time DESC");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows;
}

function getPayments(){
	global $db;
	if(isAdmin() !== true){
		return null;
	}
	$stmt = $db->prepare("SELECT * FROM payments ORDER BY time DESC");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows;
}

function getIncome(){
	$payments = getPayments();
	$amount = 0;
	foreach($payments as $payment){
		$amount += $payment['amount'];
	}
	return $amount;
}

function getTotalUsers(){
	global $db;
	$stmt = $db->prepare("SELECT count(*) FROM users"); 
	$stmt->execute(); 
	$cont = $stmt->fetchColumn(); 
	return $cont;
}


function getTotalGenerated(){
	global $db;
	$stmt = $db->prepare("SELECT count(*) FROM logs"); 
	$stmt->execute(); 
	$cont = $stmt->fetchColumn(); 
	return $cont;
}

function getGeneratorAlts($gid){
	global $db;
	$stmt = $db->prepare("SELECT count(*) FROM g_" . (int)$gid); 
	$stmt->execute(); 
	$cont = $stmt->fetchColumn(); 
	return $cont;
}

function getGenerator($gid){
	global $db;
	$stmt = $db->prepare("SELECT * FROM generators WHERE id = ?"); 
	$stmt->execute(array($gid)); 
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	return $rows[0];
}

function getTotalAlts(){
	global $db;
	$generators = getAllGenerators();
	$cont_global = 0;
	foreach($generators as $generator){
		$table = g . '_' . $generator['id'];
		$stmt = $db->prepare("SELECT count(*) FROM " . $table); 
		$stmt->execute(); 
		$cont = $stmt->fetchColumn(); 
		$cont_global += $cont;
	}
	
	return $cont_global;
}



function getTicket($id){
	global $db;
	$stmt = $db->prepare("SELECT * FROM tickets WHERE id = ? OR reply_to = ? ORDER BY time ASC");
    $stmt->execute(array($id, $id));
    $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$ticket = $tickets[0];
	if(isAdmin() !== true){
		if($ticket['user_id'] != $_SESSION['id']){
			return null;
		}
	}
	return $tickets;
}


function getMembership($userid){
    global $db;
	$stmt = $db->prepare("SELECT * FROM users WHERE id=?");
    $stmt->execute(array($userid));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$membership_id = $rows[0]['membership'];
	$expire = $rows[0]['expire'];
	$stmt = $db->prepare("SELECT * FROM plans WHERE id=?");
    $stmt->execute(array($membership_id));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	if($expire <= time()){
		$stmt = $db->prepare("SELECT * FROM plans WHERE id = 0");
		$stmt->execute();
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $rows[0];
	}
	return $rows[0];
}

function get_ip(){
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

function validate($username, $email, $password){
    if(already_registered($email, $username)){
        return "You've already registered!\nDo the login!";
    } else if (strlen($password) < 6){
        return "The password must be 6 characters long or more!";
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        return "Invalid Email.";
    } else{
        return true;
    }
}

function logout(){
    session_destroy();
    header("Location: login");
}

function login($username, $password){
    global $db;
    $stmt = $db->prepare("SELECT * FROM users WHERE email=? OR  username=?");
    $stmt->execute(array($email, $username));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $password = hash_password($password);
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

function hash_password($password){
   global $key;
   $hashed_password = hash("SHA256", $password . $key);
   return $hashed_password;
}

function register($username, $email, $password, $ref){
    if (validate($username, $email, $password) === true){
        global $db;
        global $default_membership;
		global $key;
        $ip = get_ip();
        $password_hash = hash_password($password);
        $now = time();
        $stmt = $db->prepare("INSERT INTO users (`id`, `email`, `username`, `password`, `rank`, `membership`, `expire`, `ref`) VALUES (NULL, ?, ?, ?, '0', '0', NULL, ?);");
        $stmt->execute(array($email, $username, $password_hash, (int)$ref));
		return success("Signed up successfully.\nPlease, login!");
    } else {
        return error(validate($username, $email, $password));
    }

}

function getReferrals($userid){
	global $db;
	$stmt = $db->prepare("SELECT count(*) FROM users WHERE ref = ?");
    $stmt->execute(array($userid));
    $total = $stmt->fetchColumn();
	$stmt = $db->prepare("SELECT * FROM users WHERE ref = ?");
    $stmt->execute(array($userid));
    $paid_rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$paid_count = 0;
	foreach($paid_rows as $paid){
		if(getUser($paid['id'])['membership'] != 0){
			$paid_count++;
		}
	}
	return array('paid' => $paid_count - getUser($userid)['used_ref'], 'total' => $total);
	
}

function redeemPlan($userid, $planid){
	$plan = getPlan($planid);
	if($plan == null){
		return null;
	}
	if($plan['r_cost'] > getReferrals($userid)['paid']){
		return error("You haven't enought referrals to redeem this plan!");
	}
	setMembership($userid, $plan['id']);
	global $db;
	$stmt = $db->prepare("UPDATE users SET used_ref = used_ref + ? WHERE id = ?");
	$stmt->execute(array($plan['r_cost'], $userid));
	return success("You successfully redeemed " . $plan['name'] . " plan!");
}


function generatorImport($generator, $accounts){
	global $db;
	$accounts = explode("\n", $accounts);
	$cont = 0;
	$table = "g_" . (int)$generator;
	foreach($accounts as $account){
		$stmt = $db->prepare("INSERT INTO $table (id, alt) VALUES (NULL, ?);");
		$stmt->execute(array($account));
		$cont++;
	}
	return success("$cont accounts imported successfully!");
}

function writeNews($title, $text){
	if(strlen($title) < 2 || strlen($text) < 2){
		return error("The text/title is too short!");
	}
	global $db;
	global $_SESSION;
	$stmt = $db->prepare("INSERT INTO news (id, title, text, time, user_id) VALUES (NULL, ?, ?, ?, ?);");
	$stmt->execute(array($title, $text, time(), $_SESSION['id']));
	return success("News successfully posted!");
}
function createGenerator($generator, $private){
	global $db;
	$stmt = $db->prepare("INSERT INTO generators (`id`, `name`, `private`) VALUES (NULL, ?, ?);");
	$stmt->execute(array($generator, $private));
	$stmt = $db->prepare("SELECT * FROM generators ORDER BY id DESC LIMIT 1");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
	$generator_id = $row['id'];
	$sql = '
	CREATE TABLE IF NOT EXISTS `g_' . $generator_id . '` (`id` int(11) NOT NULL,  `alt` varchar(120) NOT NULL) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
	ALTER TABLE `g_' . $generator_id . '` ADD PRIMARY KEY (`id`);
	ALTER TABLE `g_' . $generator_id . '` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;';
	$stmt = $db->prepare($sql);
	$stmt->execute();
	return success("Generator created successfully.");
}

function deleteGenerator($generator){
	global $db;
	if(isAdmin() === false){
		return null;
	}
	$stmt = $db->prepare("DELETE FROM generators WHERE id = ?");
	$stmt->execute(array($generator));

	$sql = 'DROP TABLE `g_' . $generator . '`;';
	$stmt = $db->prepare($sql);
	$stmt->execute();
	return success("Generator deleted successfully.");
}

function getCurrentDate(){
	$tmsp = strtotime("now");
	return date('d m Y',$tmsp);
}

function getSettings(){
	global $db;
	$stmt = $db->prepare("SELECT * FROM settings WHERE id = 0");
	$stmt->execute();
	$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$settings = $rows[0];
	return $settings;
}

function getLogs(){
	global $db;
	$stmt = $db->prepare("SELECT * FROM logs");
	$stmt->execute();
	$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$logs = $rows;
	return $logs;
}

function createPlan($name, $duration, $daily, $price, $private, $private_daily){
	global $db;
	$duration = $duration * (3600*24);
	$stmt = $db->prepare("INSERT INTO plans (id, name, duration, daily, price, private, private_daily) VALUES (NULL, ?, ?, ?, ?, ?, ?);");
	$stmt->execute(array($name, $duration, $daily, $price, $private, $private_daily));
	return success("New plan successfully created!");
}
function updatePlan($plan, $name, $duration, $daily, $price, $private, $private_daily){
	global $db;
	$duration = $duration * (3600*24);
	$stmt = $db->prepare("UPDATE plans SET name = ?, duration = ?, daily = ?, price = ?, private = ?, private_daily = ? WHERE id = ?");
	$stmt->execute(array($name, $duration, $daily, $price, $private, $private_daily, $plan));
	return success("Plan " . getPlan($plan)['name'] . " successfully updated!");
}

function generateAccount($userid, $generator){
	global $db;
	$membership = getMembership($userid);
	$table_name = "g_" . (int)$generator;
	if($membership['id'] == 0){
		return "You haven't a valid plan";
	}
	$stmt = $db->prepare("SELECT * FROM generators WHERE id = ?");
    $stmt->execute(array($generator));
    $generator = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
	if($generator['private'] == 1){
		return null;
	}
	$user = getUser($userid);
	$today_date  = $user['today_date'];
	if($today_date != getCurrentDate()){
		$stmt = $db->prepare("UPDATE users SET today_date = ?, today_count = ? WHERE id = ?");
        $stmt->execute(array(getCurrentDate(), 0, $userid));
	}
	$user = getUser($userid);
	$today_count = $user['today_count'];
	if($today_count >= $membership['daily']){
		return "Daily limit reached! Try tomorrow.";
	}
	$stmt = $db->prepare("SELECT * FROM " . $table_name . " ORDER BY rand() LIMIT 1");
    $stmt->execute(array($table_name));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$alt = $rows[0]['alt'];
	if($alt == null){
		return "There aren't accounts in stock, try later!";
	}
	$stmt = $db->prepare("UPDATE users SET today_count = today_count + 1 WHERE id = ?");
    $stmt->execute(array($userid));
	if(getSettings()['unique_accounts'] == 1){
		$stmt = $db->prepare("DELETE FROM " . $table_name . " WHERE id = ?");
		$stmt->execute(array($rows[0]['id']));
	}
	generatorLog($userid, $alt, $generator['id']);
	return $alt;
}

function generatePrivateAccount($userid, $generator){
	global $db;
	$table_name = "g_" . (int)$generator;
	$membership = getMembership($userid);
	if($membership['id'] == 0){
		return "You haven't a valid plan";
	}
	if($membership['private'] != 1){
		return "You haven't a valid plan";
	}
	$stmt = $db->prepare("SELECT * FROM generators WHERE id = ?");
    $stmt->execute(array($generator));
    $generator = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
	if($generator['private'] == 0){
		return null;
	}
	$user = getUser($userid);
	$today_date  = $user['today_date'];
	if($today_date != getCurrentDate()){
		$stmt = $db->prepare("UPDATE users SET today_date = ?, today_count = ?, private_count = ? WHERE id = ?");
        $stmt->execute(array(getCurrentDate(), 0, 0, $userid));
	}
	$user = getUser($userid);
	$today_count = $user['private_count'];
	if($today_count >= $membership['private_daily']){
		return "Daily limit reached! Try tomorrow.";
	}
	$stmt = $db->prepare("SELECT * FROM " . $table_name . " ORDER BY rand() LIMIT 1");
    $stmt->execute(array($table_name));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$alt = $rows[0]['alt'];
	if($alt == null){
		return "There aren't accounts in stock, try later!";
	}
	$stmt = $db->prepare("UPDATE users SET private_count = private_count + 1 WHERE id = ?");
    $stmt->execute(array($userid));
	$stmt = $db->prepare("DELETE FROM " . $table_name . " WHERE id = ?");
	$stmt->execute(array($rows[0]['id']));
	generatorLog($userid, $alt, $generator['id']);
	return $alt;
}

function updateSettings($site_name, $site_desc, $paypal_email, $paypal_link, $autobuy, $autodelete){
	global $db;
	$stmt = $db->prepare("UPDATE settings SET site_name = ?, site_desc = ?, paypal_email = ?, paypal_link = ?, autobuy = ?, unique_accounts = ? ;");
	$stmt->execute(array($site_name, $site_desc, $paypal_email, $paypal_link, $autobuy, $autodelete));
	return success("Website Settings updated successfully");
}


?>
