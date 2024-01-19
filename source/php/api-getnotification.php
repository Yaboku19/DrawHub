<?php
require_once("db_config.php");

if (isset($_SESSION["username"])) {
    if ($_SESSION["username"] == "") {
        $result["success"] = false;
        $result["comment"] = "username della session vuota per le notifiche";
    } else {
        $result["followers"] = $dbh->getAllNewFollower($_SESSION["username"]);
        $result["comments"] = $dbh->getAllNewComment($_SESSION["username"]);
        $result["reactions"] = $dbh->getAllNewReaction($_SESSION["username"]);
        $result["success"] = true;
    }
} else {
    $result["success"] = false;
    $result["comment"] = "username della session null per le notifiche";
}

header("Content-Type: application/json");
echo(json_encode($result));
?>