<?php

require_once 'db_config.php';


if (isset($_POST["postID"]) && isset($_SESSION["username"]) && isset($_POST["reactionType"])) {
    if($dbh->isReactionAlreadyPresent( $_SESSION["username"], $_POST["postID"], $_POST["reactionType"])) {
        //qua è gia presente la reazione, quindi devo toglierla
        $dbh->removeReaction($_SESSION["username"], $_POST["postID"] ,$_POST["reactionType"]);
    } else {
        $dbh->addReaction($_SESSION["username"], $_POST["postID"], $_POST["reactionType"]);
        //qua non è presente la reazione quindi devo aggiungerla
    }
    $reactCount = $dbh->getAllReactionCount($_POST["postID"]);

}

header("Content-Type: application/json");
echo json_encode($reactCount);
?>