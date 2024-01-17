<?php
require_once("db_config.php");

$numeropost = 5;
$var = false;
if (isset($_SESSION["user_id"])) {
    $post = $dbh->getPosts($_SESSION["user_id"], $numeropost); //prende i post degli utenti che segue

    /*for($i = 0; $i < count($post); $i++) {
        $post[$i]["data"] = date("F j, Y", strtotime($post[$i]["data"]));
        $post[$i]["num_comments"] = $dbh->getPostComments($post[$i]["post_id"]);
        
        //$reactCount = $dbh->getAllReactionCount($post[$i]["post_id"]);
        //$userReactions = $dbh->hasReactedAll($_SESSION["user_id"], $post[$i]["post_id"]);
        //$post[$i] = array_merge($post[$i] , $reactCount);
        //$post[$i] = array_merge($post[$i] , $userReactions);
        
        $var = true;
    }*/
    $var = true;
}

$post1["posts"] = $post;
$post1["success"] = $var;

$templateParams["title"] = "Show Post";
header("Content-Type: application/json");
echo json_encode($post1);

?>