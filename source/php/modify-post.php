<?php
require_once("db_config.php");

$templateParams["title"] = "Modifica Post";
$templateParams["homepage"] = "";
$templateParams["notifications"] = "";
$result["success"] = false;
$postId = /*$_POST["postId"];*/$_SESSION["postID"];
$descrizione = /*$_POST["descrizione"];*/$_SESSION["description"];
/*$postId = $params["postID"];
$descrizione = $params["description"];*/

/*if(isset($_POST["submit"]) && isset($_POST["postId"])) {
    echo "vardump post " . $_POST["postId"] . "pippo";//mostra il contenuto di $_POST
}*/
/*$result["success"] = true;*/
//$templateParams["post_info"]["postID"]
$result["check"]=isset($_POST["postId"]);
//$result["pid"] = $postId;
/*$result["dsc"] = $descrizione;*/
$result["_POST"] = $_POST;
if(isset($_POST["descrizione"])) {
    $descrizione = $_POST["descrizione"];
}
if(isset($_POST["postId"])) {
    $postId = $_POST["postId"];
}

if(!isset($_SESSION["errormsg"])) {
if(isset($postId) && isset($_SESSION["username"])) {
    $result["prova"]="primo if";
    $loggedUserId = $_SESSION["username"];
    //$postId = $_POST["postId"];
    $post_exists = $dbh->checkValueInDb("post", "postID", $postId);
    if ($post_exists) {
        $result["prova"]="secondo if";
        $postInfo = $dbh->getPostbyId($postId);
        if ($postInfo["user"] === $loggedUserId) {
            $result["prova"]="terzo if";
            $result["issetSubmit"]=isset($_POST["submit"]);
            if(isset($_POST["submit"])) { //cliccato pulsante conferma->aggiorno post
                $result["issetDescrizione"]=isset($descrizione);
                $result["oldDescription"]=$postInfo["description"];
                $result["user"] = $postInfo["user"];
                if(isset($descrizione) && $descrizione != "" && $descrizione != $postInfo["description"]) {
                    $result["prova"]="quarto if";
                    $dbh->updatePost($postId, $descrizione);
                    $result["success"] = true;
                    header("Location: profile.php?username=".$loggedUserId);
                } else {
                    $result["prova"]="error if";
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
                $result["prova"]="sesto if";
                $result["postInfo"]= $postInfo;
            }
        } else {
            //$templateParams["name"] = "show-error.php";
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
    $result["postID"] = $postId;
    $result["descrizione"] = $descrizione;
    $_SESSION["errormsg"] = null;
    //$result["prova"] = "sono nell'else";
}

header("Content-Type: application/json");
echo json_encode($result);

?>