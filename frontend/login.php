<?php
//Start session
session_start();

if ($_SESSION['username']) {
    header("Location: ./insert.php");
    die();
}

?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
    <title>Login for admin</title>
</head>
<body>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="topWave">
        <path fill="#0099ff" fill-opacity="0.8" d="M0,160L48,186.7C96,213,192,267,288,245.3C384,224,480,128,576,96C672,64,768,96,864,122.7C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>

    <form class="log" action="./insert.html">
        <h1>Login</h1>
        <p>Username</p>
        <input type="text" id="nome" />
        <p>Password</p>
        <input type="password" id="psw" />
        <br /><br />
        <button type="submit" class="send">
            <span>Login</span>
            <div class="liquid"></div>
          </button>
    </form>
    <script type="text/javascript" src="login.js"></script>
</body>
</html>
<!--https://stackoverflow.com/questions/9802788/call-a-rest-api-in-php-->