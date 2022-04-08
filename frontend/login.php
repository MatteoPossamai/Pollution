<?php

session_start();

$result     = false;
$errors     = [];
$response   = "";

$username = isset($_SESSION['username']) ? $_SESSION['username'] : '';

//Controllo se login già avvenuto
if ($username) {
    header("Location: ./insert.php");
    die();
}

function httpPost($url, $data)
{
    //Create a new cURL resource
    $ch = curl_init($url);
    //Setup request to send json via POST
    $payload = json_encode($data);
    // Attach encoded JSON string to the POST fields
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    // Set the content type to application/json
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

if (isset($_REQUEST['login'])) {
    $user  = isset($_REQUEST['user']) ? $_REQUEST['user'] : '';
    $pwd  = isset($_REQUEST['psw']) ? $_REQUEST['psw'] : '';
    $data = [
        'username' => $user,
        'password' => $pwd
    ];
    // controllo dei parametri inseriti
    if(!empty($user) || !empty($pwd)){
        $errors[] = 'Inserisci username E password per il login';
    }else{
        //Make POST request with cURL
        $url = "https://mad4feltre.herokuapp.com/login";
        $response = httpPost($url, $data);
        //Check if user is valid
        if ($response == "ACCEPTED") {
            //Set session variables
            $_SESSION['username'] = $user;
            //Redirect to page
            header("Location: ./insert.php");
            die();
        } else {
            $errors[] = 'Nome utente o password non corretti';
        }
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
    <!--Waves-->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="topWave">
        <path fill="#0099ff" fill-opacity="0.8" d="M0,160L48,186.7C96,213,192,267,288,245.3C384,224,480,128,576,96C672,64,768,96,864,122.7C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
    </svg>

    <?php if (!empty($errors)): // eventuali messaggi di errore ?>
        <div class="dd">
            <?php echo(implode('<br/>', $errors)); ?>
        </div>
    <?php endif; ?>

    <!---Login form-->
    <form action="" method="POST" class="log" >
        <h1>Login</h1>
        <p>Username</p>
        <input type="text" id="nome" name="user" />
        <p>Password</p>
        <input type="password" id="psw" name="psw" />
        <br /><br />
        <input type="submit" name="login" value="login" class="send" type="submit"/>
    </form>
    
    <script type="text/javascript" src="login.js"></script>
</body>
</html>