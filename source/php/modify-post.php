<?php
require_once("db_config.php");

$templateParams["title"] = "Modifica Post";
$templateParams["homepage"] = "";
$templateParams["notifications"] = "";
$result["success"] = false;
$postId = $_SESSION["postID"];
$descrizione = $_SESSION["description"];

if(isset($_POST["descrizione"])) {
    $descrizione = $_POST["descrizione"];
}
if(isset($_POST["postId"])) {
    $postId = $_POST["postId"];
}

$postInfo = $dbh->getPostbyId($postId);
if(!isset($_SESSION["errormsg"])) {
    if(isset($postId) && isset($_SESSION["username"])) {
        $loggedUserId = $_SESSION["username"];
        $post_exists = $dbh->checkValueInDb("post", "postID", $postId);
        if ($post_exists) {
            if ($postInfo["user"] === $loggedUserId) {
                $result["issetSubmit"]=isset($_POST["submit"]);
                if(isset($_POST["submit"])) { //cliccato pulsante conferma->aggiorno post
                    if(isset($descrizione) && $descrizione != "" && $descrizione != $postInfo["description"]) {
                        $dbh->updatePost($postId, $descrizione);
                        $result["success"] = true;
                        header("Location: profile.php?username=".$loggedUserId);
                    } else {
                        $result["errormsg"] = "Descrizione post vuota o non modificata";
                        $_SESSION["errormsg"] = "Descrizione post vuota o non modificata";
                        $result["success"] = false;
                        header("Location: showModifyPost.php?postId=" . $postId . "&descrizione=" . $descrizione ."&errormsg=" . $result["errormsg"]);
                    }
                } 
                if(isset($_POST["delete"])) { //cliccato pulsante eliminapost->elimino
                    if(!$dbh->removePost($postId)) {
                        $result["errormsg"] = "Impossibile eliminare il post";
                    } else {
                        $result["success"] = true;
                        header("Location: profile.php?username=".$loggedUserId);
                    }
                }
                if(!isset($_POST["submit"]) && !isset($_POST["delete"])) {//questa parte di codice serve per far mostrare il form la prima volta
                    $result["success"] = true;
                    $result["postInfo"]= $postInfo;
                }
            } else {
                $result["errormsg"] = "L'utente loggato non è l'autore del post.";
            }
        } else {
            $result["errormsg"] = "Post non trovato.";
        }
    } else {
        $result["errormsg"] = "Utente non loggato o id del post non presente.";
}
} else {
    $result["errormsg"] = $_SESSION["errormsg"];
    $_SESSION["errormsg"] = null;
    $_SESSION["postID"] = null;
    $_SESSION["description"] = null;
    $result["postInfo"]= $postInfo;
}

header("Content-Type: application/json");
echo json_encode($result);

?>