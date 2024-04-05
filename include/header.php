<?php 
require_once("config.php");

?>
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>?php echo getSettings()['website_name']; ?></title>
    <meta name="description" content="?php echo getSettings()['website_desc']; ?>">
    <meta name="author" content="?php echo getSettings()['website_author']; ?>">
    <meta name="keywords" content="?php echo getSettings()['website_keywords']; ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
    <script
      src="https://kit.fontawesome.com/457d18dfca.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <header>
      <nav>
        <ul>
          <li>
            <a href="index.php">Home</a>
          </li>
          <li>
            <a href="compiti.php">Compiti</a>
          </li>
          <li>
            <a href="voti.php">Voti</a>
          </li>
          <li>
            <a href="materiale.php">Materiale</a>
          </li>
          <li>
            <a href="frequenze.php">Frequenze</a>
          </li>
        </ul>
        <a href="#">
          <img id="user-logo"
            src="https://media.istockphoto.com/id/471927031/it/foto/testa-quadrata-uomo.jpg?s=1024x1024&w=is&k=20&c=P8kyX2JwfAiEOyYUzcE1IIe8Mr5PF_S4_Hp-2XWWiHY="
            alt="logo"
          />
        </a>
      </nav>
      <nav class="box" id="navigation-bar">
        <ul>
          <li>
            <a href="profilo.html">profilo</a>
          </li>
          <li>
            <a href="logout.html">logout</a>
          </li>
          <li>
            <a href="impostazioni.html">impostazioni</a>
          </li>
        </ul>
    </header>