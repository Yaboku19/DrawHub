<?php

require_once 'db_config.php';

$res["valore"] = 0;
$res["username"] = "";
$res["postID"] = "";
$res["reactionType"] = "";



if (isset($_POST["postID"]) && isset($_SESSION["user_id"]) && isset($_POST["reactionType"])) {
    if($dbh->isReactionAlreadyPresent($_POST["postID"], $_SESSION["user_id"], $_POST["reactionType"])) {
        $res["valore"] = 1; //qua è gia presente la reazione, quindi devo toglierla
    } else {
        $res["valore"] = 2; //qua non è presente la reazione quindi devo aggiungerla
    }
    $res["username"] =  $_SESSION["user_id"];
    $res["postID"] = $_POST["postID"];
    $res["reactionType"] = $_POST["reactionType"];


}

header("Content-Type: application/json");
echo json_encode($res);
?>