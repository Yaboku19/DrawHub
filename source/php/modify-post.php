<?php
require_once("db_config.php");

$templateParams["title"] = "Modifica Post";
$templateParams["homepage"] = "";
$templateParams["notifications"] = "";
$result["success"] = false;
$postId = $_POST["postId"];//$templateParams["postID"];
$descrizione = $_POST["descrizione"];//$templateParams["description"];

/*if(isset($_POST["submit"]) && isset($_POST["postId"])) {
    echo "vardump post " . $_POST["postId"] . "pippo";//mostra il contenuto di $_POST
}*/
/*$result["success"] = true;*/
//$templateParams["post_info"]["postID"]
$result["check"]=isset($_POST["postId"]);
if(isset($_POST["submit"]) || isset($_POST["delete"]) && isset($postId) && isset($_SESSION["username"])) {
    $result["prova"]="primo if";
    $loggedUserId = $_SESSION["username"];
    //$postId = $_POST["postId"];
    $post_exists = $dbh->checkValueInDb("post", "postID", $postId);
    if ($post_exists) {
        $postInfo = $dbh->getPostbyId($postId);
        if ($postInfo["user"] === $loggedUserId) {
            if(isset($_POST["submit"])) { //cliccato pulsante conferma->aggiorno post
                if(isset($descrizione) && $descrizione != "" && $descrizione != $postInfo["description"]) {
                    $dbh->updatePost($postId, $descrizione);
                    header("Location: profile.php?username=".$loggedUserId);
                    $result["success"] = true;
                } else {
                    $result["errormsg"] = "Descrizione post vuota o non modificata";
                }
            } else if(isset($_POST["delete"])) { //cliccato pulsante eliminapost->elimino
                $result["success"] = true;
                $dbh->removePost($postId);
                header("Location: profile.php?username=".$loggedUserId);
            }
        } else {
            //$templateParams["name"] = "show-error.php";
            $result["errormsg"] = "L'utente loggato non e' l'autore del post.";
        }
    } else {
        $result["name"] = "show-error.php";
        $result["errormsg"] = "Post non trovato.";
    }
} else {
    //$templateParams["name"] = "show-error.php";
    $result["errormsg"] = "Utente non loggato o id del post non presente.";
}

/*else if (isset($_POST["postId"]) && isset($_SESSION["username"])) {
    $loggedUserId = $_SESSION["username"];
    $postId = $_POST["postId"];
    $post_exists = $dbh->checkValueInDb("post", "postID", $postId);
    if ($post_exists) {
        $postInfo = $dbh->getPostbyId($postId);
        if ($postInfo["user"] === $loggedUserId) {
            //$result["check"]=$_POST["postId"];
            $templateParams["post_info"] = $postInfo;
            //$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../js/modify-post.js");
            $templateParams["name"] = "show-modify-post.php";
        } else {
            //$templateParams["name"] = "show-error.php";
            $templateParams["errormsg"] = "L'utente loggato non e' l'autore del post.";
        }
    } else {
        //$templateParams["name"] = "show-error.php";
        $templateParams["errormsg"] = "Post non trovato.";
    }
} else {
    //$templateParams["name"] = "show-error.php";
    $templateParams["errormsg"] = "Utente non loggato o id del post non presente.";
}*/

//$result["success"]=true;
header("Content-Type: application/json");
echo json_encode($result);
//require '../template/base.php';
?>