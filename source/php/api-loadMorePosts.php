<?php
require_once("db_config.php");

$numeropost = 5;
$var = false;
$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);
$num = $data['numPost'];

if (isset($_SESSION["username"]) && isset($num)) {
    $post = $dbh->getMorePosts($_SESSION["username"], $num); 

    for($i = 0; $i < count($post); $i++) {
        $post[$i]["datePost"] = date("F j, Y", strtotime($post[$i]["datePost"]));
        $post[$i]["num_comments"] = $dbh->getPostComments($post[$i]["postID"]);
        
        $reactCount = $dbh->getAllReactionCount($post[$i]["postID"]);
        $post[$i] = array_merge($post[$i] , $reactCount);
        $userReactions = $dbh->hasReactedAll($_SESSION["username"], $post[$i]["postID"]);
        
        $post[$i] = array_merge($post[$i] , $userReactions);
        $var = true;
    }

}

$post1["posts"] = $post;
$post1["success"] = $var;
$post1["numero"] = $num;

$templateParams["title"] = "Show Post";
header("Content-Type: application/json");
echo json_encode($post1);

?>