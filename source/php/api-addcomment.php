<?php
    require_once("db_config.php");
    if (isset($_POST["postID"]) || isset($_POST["text"])) {
        if ($_POST["postID"] == "") {
            $result["success"] = false;
            $result["comment"] = "id post per commenti vuoto";
        } else if($_POST["text"] == "") {
            $result["success"] = false;
            $result["comment"] = "text per commenti vuoto";
        }else if ($dbh->addComment($_SESSION["username"], $_POST["postID"], $_POST["text"])){
            $result["success"] = true;
        } else {
            $result["success"] = false;
            $result["comment"] = "query fallita per l'aggiunta di un commento";
        }
        
    } else {
        $result["success"] = false;
        $result["comment"] = "non settato id post or text per commenti";
    }
    header("Content-Type: application/json");
    echo(json_encode($result));
?>