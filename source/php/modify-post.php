<?php
require_once("db_config.php");

$templateParams["title"] = "Modifica Post";
$templateParams["homepage"] = "";
$templateParams["notifications"] = "";

/*if(isset($_POST["submit"]) && isset($_GET["postId"])) {
    echo "vardump post " . $_GET["postId"] . "pippo";//mostra il contenuto di $_POST
}*/
if(isset($_POST["submit"]) || isset($_POST["delete"]) && isset($_GET["postId"]) && isset($_SESSION["username"])) {
    echo "sono qui\n";
    $loggedUserId = $_SESSION["username"];
    $postId = $_GET["postId"];
    $post_exists = $dbh->checkValueInDb("post", "postID", $postId);
    if ($post_exists) {
        $postInfo = $dbh->getPostbyId($postId);
        if ($postInfo["user"] === $loggedUserId) {
            if(isset($_POST["submit"])) { //cliccato pulsante conferma->aggiorno post
                echo "sono dentro submit\n";
                if(isset($_POST["descrizione"]) && $_POST["descrizione"] != "" && $_POST["descrizione"] != $postInfo["description"]) {
                    echo "sono dentro verifica descrizione\n";
                    $dbh->updatePost($postId, $_POST["descrizione"]);
                    header("Location: profile.php?username=".$loggedUserId);
                } else {
                    echo "sono dentro ELSE upadte post";
                    $templateParams["name"] = "show-error.php";
                    //$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js",  "../js/modify-post.js" , "../js/show-error.js");
                    $templateParams["errormsg"] = "Descrizione post vuota o non modificata";
                }
            } else if(isset($_POST["delete"])) { //cliccato pulsante eliminapost->elimino
                echo "sono in delete";
                $dbh->removePost($postId);
                header("Location: profile.php?username=".$loggedUserId);
            }
        } else {
            $templateParams["name"] = "show-error.php";
            $templateParams["errormsg"] = "L'utente loggato non e' l'autore del post.";
        }
    } else {
        $templateParams["name"] = "show-error.php";
        $templateParams["errormsg"] = "Post non trovato.";
    }
} else if (isset($_GET["postId"]) && isset($_SESSION["username"])) {
    $loggedUserId = $_SESSION["username"];
    $postId = $_GET["postId"];
    $post_exists = $dbh->checkValueInDb("post", "postID", $postId);
    if ($post_exists) {
        $postInfo = $dbh->getPostbyId($postId);
        if ($postInfo["user"] === $loggedUserId) {
            $templateParams["post_info"] = $postInfo;
            $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../js/modify-post.js");
            $templateParams["name"] = "show-modify-post.php";
        } else {
            $templateParams["name"] = "show-error.php";
            $templateParams["errormsg"] = "L'utente loggato non e' l'autore del post.";
        }
    } else {
        $templateParams["name"] = "show-error.php";
        $templateParams["errormsg"] = "Post non trovato.";
    }
} else {
    $templateParams["name"] = "show-error.php";
    $templateParams["errormsg"] = "Utente non loggato o id del post non presente.";
}
require '../template/base.php';
?>