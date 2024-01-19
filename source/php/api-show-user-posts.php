<?php
require_once("db_config.php");

$result["success"] = false;
if (isset($_POST["profileUsername"])) {
    $username = $_POST["profileUsername"];
    $nameCheck = $dbh->checkValueInDb("user", "username", $username);
    if ($nameCheck) {
        $result["success"] = true;
        $result["userPosts"] = $dbh->getAllUserPosts($username);
        $result["viewingLoggedUserPosts"] = $_SESSION["username"] === $username;
        $userInfo = $dbh->getUserInfo($username);

        for ($i = 0; $i < count($result["userPosts"]); $i++) {
            $id = $result["userPosts"][$i]["postID"];
            $result["userPosts"][$i]["datePost"] = date("F j, Y", strtotime($result["userPosts"][$i]["datePost"]));
            $reactCount = $dbh->getAllReactionCount($id);
            $userReactions = $dbh->hasReactedAll($_SESSION["username"], $id);
            $result["userPosts"][$i]["userProfilePicture"] = $userInfo["urlProfilePicture"];
            $result["userPosts"][$i] = array_merge($result["userPosts"][$i], $reactCount);
            $result["userPosts"][$i] = array_merge($result["userPosts"][$i], $userReactions);            
            /*
            $userReactions = $dbh->hasReactedAll($_SESSION["username"], $post[$i]["postID"]);
            $post[$i] = array_merge($post[$i] , $userReactions); */

            //$result["userPosts"][$i]["num_comments"] = $dbh->getPostComments($id);
        }
    } else {
        $result["errormsg"] = "User not found";
    }
} else {
    $result["errormsg"] = "Missing username";
}

header("Content-Type: application/json");
echo(json_encode($result));
?>