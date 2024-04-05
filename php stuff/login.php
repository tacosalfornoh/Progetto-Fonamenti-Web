<?php
session_start();
include 'include/functions/index.php';


if (isset($_POST['login'])) {
  global $database;
  $username = $_POST['username'];
  $password = $_POST['password'];
  if (empty($username) || empty($password)) {
    echo "Please fill in all the fields";
  } else {
    $db = $database->prepare("SELECT * FROM utenti WHERE username=?");
    $db->execute(array($username));
    $rows = $db->fetchAll(PDO::FETCH_ASSOC);
    $real_password = ($rows[1]['password']);
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
  
}
?>        
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/other/login.css" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
    />
    <script
      src="https://kit.fontawesome.com/457d18dfca.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div class="stripes"></div>
    <main>
      <section id="login">
        <article class="box">
          <img
            src="https://nuvolanova.com/cdn/shop/files/Screenshot_2023-12-21_17.32.05-removebg_d0aa14e2-3cee-40f1-8127-2c07821d2722.png?v=1703863117&width=600"
            alt="logo"
          />
          <form action="login.php" method="post">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <div class="form-group">
        <button type="submit" name="login">Login</button>
      </div>
    </form>
        </article>
      </section>
    </main>
    <script type="text/javascript">
		function login(){
      var username = $("#username")[0].value;
      var password = $("#password")[0].value;
			$.post("../include/functions/?doLogin", "username=" + username + "&password=" + password, function(result){
			$("#response")[0].innerHTML = result;
        if(result.includes("success")){
          setTimeout(function(){
            window.location.href = "index.php";
           }, 1000);
        }
      });
    }
		document.onkeypress = function (e) {
			if(e.keyCode == 13){
				if( $("#username")[0].value != ""){
					login();
				}
				
			}
		};
		</script>
  </body>
</html>
