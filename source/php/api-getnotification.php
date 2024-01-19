<?php
require_once("db_config.php");

if (isset($_SESSION["username"])) {
    if ($_SESSION["username"] == "") {
        $result["success"] = false;
        $result["comment"] = "username della session vuota per le notifiche";
    } else {
        $result["comment"] = $_SESSION["username"];
    }
} else {
    $result["success"] = false;
    $result["comment"] = "username della session null per le notifiche";
}

header("Content-Type: application/json");
echo(json_encode($result));
?>