<?php
    require_once("db_config.php");
    if (isset($_POST["postID"])) {
        if ($_POST["postID"] == "") {
            $result["success"] = false;
            $result["comment"] = "id post per commenti vuoto";
        } else {
            $result["success"] = true;
            $result["comments"] = $dbh->getAllCommentOfAPost($_POST["postID"]);
            $result["user"] = $_SESSION["username"];
        }
        
    } else {
        $result["success"] = false;
        $result["comment"] = "non settato id post per commenti";
    }
    header("Content-Type: application/json");
    echo(json_encode($result));
?>