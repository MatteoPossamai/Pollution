<?php

session_start();

$result     = false;
$errors     = [];

$username = isset($_SESSION['username']) ? $_SESSION['username'] : '';

//Controllo se login già avvenuto
if ($username) {
    header("Location: ./insert.php");
    die();
}

if (isset($_REQUEST['login'])) {
    $user  = isset($_REQUEST['user']) ? $_REQUEST['user'] : '';
    $pwd  = isset($_REQUEST['psw']) ? $_REQUEST['psw'] : '';
    $data = [
        'user' => $user,
        'pwd' => $pwd
    ];
    echo $user ? "si" : "no";
    //Call api to verify user and password
    $curl = curl_init();
    //Set api endpoint
    curl_setopt($curl, CURLOPT_POST, "https://mad4feltre.herokuapp.com/login");
    //Set data to send
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
    //Get response
    $response = curl_exec($curl);
    curl_close($curl);
    //Decode json response
    $response = json_decode($response, true);
    echo $response;
    //Check if user is valid
    if ($response) {
        //Set session variables
        $_SESSION['username'] = $user;
        //Redirect to page
        header("Location: ./insert.php");
        die();
    } else {
        $errors[] = 'Nome utente o password non corretti';
    }
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
    <main>
    <form action="" method="POST" class="log">
        <h1>Login</h1>
        <p>Username</p>
        <input type="text" id="nome" />
        <p>Password</p>
        <input type="password" id="psw" />
        <br /><br />
        <input type="submit" name="login" value="login" class="send" type="submit"/>
    </form>
    </main>
    <script type="text/javascript" src="login.js"></script>
</body>
</html>