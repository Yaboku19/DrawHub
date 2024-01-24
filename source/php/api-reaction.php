<?php

require_once 'db_config.php';


if (isset($_POST["postID"]) && isset($_SESSION["username"]) && isset($_POST["reactionType"])) {
    if($dbh->isReactionAlreadyPresent( $_SESSION["username"], $_POST["postID"], $_POST["reactionType"])) {
        $dbh->removeReaction($_SESSION["username"], $_POST["postID"] ,$_POST["reactionType"]);
    } else {
        $dbh->addReaction($_SESSION["username"], $_POST["postID"], $_POST["reactionType"]);
    }
    $reactCount = $dbh->getAllReactionCount($_POST["postID"]);

}

header("Content-Type: application/json");
echo json_encode($reactCount);
?>