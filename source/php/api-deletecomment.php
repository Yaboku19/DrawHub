<?php
    require_once("db_config.php");
    if (isset($_POST["postID"]) && isset($_POST["user"]) && isset($_POST["commentID"])) {
        if ($_POST["postID"] == "") {
            $result["success"] = false;
            $result["comment"] = "id post per eliminazione commenti vuoto";
        } else if ($_POST["user"] == "") {
            $result["success"] = false;
            $result["comment"] = "user per eliminazione commenti vuoto";
        } else if ($_POST["commentID"] == "") {
            $result["success"] = false;
            $result["comment"] = "commentID per eliminazione commenti vuoto";
        } else if (true) {
            $result["success"] = true;
            $result["comment"] = $_POST["commentID"];
        } else {
            $result["success"] = false;
            $result["comment"] = "query fallita";
        }
        
    } else {
        $result["success"] = false;
        $result["comment"] = "non settato id post, user o commentID per eliminare un commento";
    }
    header("Content-Type: application/json");
    echo(json_encode($result));
?>