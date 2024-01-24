<?php
require_once("db_config.php");

$numeropost = 2;
$var = false;
$modifyButton= false;
$loggedUser= true;
$message="";
if (isset($_SESSION["username"]) && isset($_POST["postsView"])) {
    if($_POST["postsView"] == "HomePage") {
        $post = $dbh->getHomePosts($_SESSION["username"], $numeropost);
    } else if($_POST["postsView"] == "Explore") {
        $post = $dbh->getExplorePosts($_SESSION["username"], $numeropost);
    } else if($_POST["postsView"] == "Profile") {
        $post = $dbh->getAllUserPosts($_POST["username"]); 
        if($_POST["username"] === $_SESSION["username"]) {
            $modifyButton = true;
        } else {
            $loggedUser = false;
        }
    }
    
    for($i = 0; $i < count($post); $i++) {
        $post[$i]["datePost"] = date("F j, Y", strtotime($post[$i]["datePost"]));
        $post[$i]["num_comments"] = $dbh->getPostComments($post[$i]["postID"]);
        
        $reactCount = $dbh->getAllReactionCount($post[$i]["postID"]);
        $post[$i] = array_merge($post[$i] , $reactCount);
        $userReactions = $dbh->hasReactedAll($_SESSION["username"], $post[$i]["postID"]);
        
        $post[$i] = array_merge($post[$i] , $userReactions);
        $post[$i]["modifyButton"] = $modifyButton;
    }
    if(count($post) == 0) {
        $message="Non hai post da visualizzare, inizia a <a href='../php/showExplore.php'> cercare</a>";
    } else {
        $var = true;
    }
}
$posts["loggedUser"] = $loggedUser;
$posts["posts"] = $post;
$posts["success"] = $var;
$posts["message"] = $message;

$templateParams["title"] = "Show Post";
header("Content-Type: application/json");
echo json_encode($posts);

?>