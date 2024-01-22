<?php
    require_once("db_config.php");
    if (isset($_POST["notificationID"]) && isset($_POST["tableName"])) {
        if ($_POST["notificationID"] == "") {
            $result["success"] = false;
            $result["comment"] = "notificationID vuota";
        } else if ($_POST["tableName"] == "") {
            $result["success"] = false;
            $result["comment"] = "tableName vuota";
        } else if ($dbh->removeNotification($_POST["tableName"], $_SESSION["username"], $_POST["notificationID"])) {
            $result["success"] = true;
        } else {
            $result["success"] = false;
            $result["comment"] = "query fallita per il delete della notifica";
        }
    } else {
        $result["success"] = false;
        $result["comment"] = "non settato id notification o nome della tabella";
    }
    header("Content-Type: application/json");
    echo(json_encode($result));
?>