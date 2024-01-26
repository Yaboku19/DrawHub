<?php
require_once("db_config.php");

$templateParams["title"] = "Insert Post";
$templateParams["name"] = "../template/template-add-post.php";
$templateParams["homepage"] = "";
$templateParams["notifications"] = "";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../js/updateNotification.js");

$error = "";

if(isset($_POST["submit"]) && isset($_POST["post"])){
    $testo = $_POST["post"];
    if ($testo != "" && isset($_SESSION["username"])) {
        if(isset($_FILES["imgpost"]) && $_FILES["imgpost"]["name"] != ""){
            list($result, $msg) = uploadImage(UPLOAD_DIR, $_FILES["imgpost"]);
            if($result == 1){
                $dbh->addPost($_SESSION["username"], $testo, $msg, "");
                header("Location: showhomepage.php");
            } else {
                $error = $msg;
            }
        } else {
            $error = "Errore; l'immagine deve essere presente";
        }
        
    } else if($testo == ""){
        $error = "Errore; Il testo non può essere vuoto";
    } else {
        $error = "Errore; Devi essere loggato per poter inserire un post";
    }
}

require '../template/base.php';
?>