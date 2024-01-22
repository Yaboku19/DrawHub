<?php
require_once("db_config.php");

$numeropost = 1;
$var = false;
$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);
$num = $data['numPost'];
$postsView = $data['postsView'];
$modifyButton= false;
if (isset($_SESSION["username"]) && isset($num) && isset($postsView)) {
    if($postsView == "HomePage") {
        $post = $dbh->getMoreHomePosts($_SESSION["username"], $num, $numeropost); //prende i post degli utenti che segue
    } else if($postsView == "Explore") {
        $post = $dbh->getMoreExplorePosts($_SESSION["username"], $num, $numeropost); 
    } else if($postsView == "Profile") {
        $post = [];
    }

    for($i = 0; $i < count($post); $i++) {
        $post[$i]["datePost"] = date("F j, Y", strtotime($post[$i]["datePost"]));
        $post[$i]["num_comments"] = $dbh->getPostComments($post[$i]["postID"]);
        
        $reactCount = $dbh->getAllReactionCount($post[$i]["postID"]);
        $post[$i] = array_merge($post[$i] , $reactCount);
        $userReactions = $dbh->hasReactedAll($_SESSION["username"], $post[$i]["postID"]);
        
        $post[$i] = array_merge($post[$i] , $userReactions);
        $post[$i]["modifyButton"] = $modifyButton;
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