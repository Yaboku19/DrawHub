<?php
require_once("db_config.php");

$templateParams["title"] = "Modifica Post";
$templateParams["homepage"] = "";
$templateParams["notifications"] = "";

/*if(isset($_POST["submit"]) && isset($_GET["postId"])) {
    echo "vardump post " . $_GET["postId"] . "pippo";//mostra il contenuto di $_POST
}*/
if (isset($_POST["submit"]) && isset($_GET["postId"]) && isset($_SESSION["username"])) {
    $loggedUserId = $_SESSION["username"];
    $postId = $_GET["postId"];
    $post_exists = $dbh->checkValueInDb("post", "postID", $postId);
    if ($post_exists) {
        $postInfo = $dbh->getPostbyId($postId);
        if ($postInfo["user"] === $loggedUserId) {
            //echo "vardump post " . var_dump($_POST) . "pippo";//mostra il contenuto di $_POST
            if (isset($_POST["delete"]) && $_POST["delete"] === "on") {
                $dbh->removePost($postId);
                header("Location: profile.php?username=".$loggedUserId);
            } else if(isset($_POST["descrizione"]) && $_POST["descrizione"] != "" && $_POST["descrizione"] != $postInfo["description"]) {
                $ris = $dbh->updatePost($postId, $_POST["descrizione"]);
            } else {
                echo "sono dentro ELSE upadte post";
                $templateParams["name"] = "show-error.php";
                $templateParams["errormsg"] = "Errore aggiornamento bio";
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
        echo var_dump($postInfo);
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