<?php
SESSION_START();
echo "hola";
$enlace = mysql_connect('localhost', 'root', '');
if (!$enlace) {
    die('No se pudo conectar: ' . mysql_error());
}
if (!mysql_select_db('login')) {
    die('No se pudo seleccionar la base de datos: ' . mysql_error());
}
$user_info = (isset($_POST["user_login"]))? $_POST["user_login"] : "";
$user_info = json_decode($user_info,true);
$operacion = (isset($_POST["operacion"]))? $_POST["operacion"] : "";
print_r($operacion) ;

switch($operacion){
    case "logIn":
        logear($user_info);
        break;
    case "verificar":
        verificar();
        break;
    case "logOut":
        logOut();
        break;
}

function verificar(){
    if(empty($_SESSION["nombre"])){
        echo false;
    }else{
        echo true;
    } 
}

function logear($user_info){
    $errors= array(
        "error_date" => 10,
        "error_user" => 20
    );
    $query = "SELECT * FROM usuarios WHERE email = '{$user_info['email']}'";
    $email_check = mysql_query($query);
    $resultado = mysql_fetch_assoc($email_check);

    if($resultado){
        if(password_verify($user_info['pass'], $resultado["password"])){
            $_SESSION["nombre"] = $resultado["nombre"];
                echo json_encode($resultado);
        }else{
            echo json_encode($errors["error_date"]); //Datos incorrectos
        }
    }else{
        echo json_encode($errors["error_user"]); // Usuario no registrado
    }
}
function logOut(){
    echo "llegue";
    /*unset ($_SESSION['nombre']);
    session_destroy();
     header('Location: index.html'); */
}



