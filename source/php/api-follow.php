<?php
require_once("db_config.php");
//A constant for notification tipology
define("FOLLOW", 1);

$result["success"] = false;

if (isset($_SESSION["username"])) {
    $username = $_SESSION["username"];
    if (isset($_POST["followed_user"])) {
        $followed_user = $_POST["followed_user"];
        if ($username !== $followed_user) {
            if (isset($_POST["action"])) {
                $action = $_POST["action"];
                $isFollowing = $dbh->isUserFollowing($username, $followed_user);
                $result["action"] = $action;
                switch ($action) {
                    case "follow":
                        $result["success"] = !$isFollowing;
                        if ($result["success"]) {
                            $dbh->addFollower($followed_user, $username);
                            //$dbh->addNotification($username, $followed_user, null, FOLLOW);
                        } else {
                            $result["errormsg"] = "Cannot follow already followed user";
                        }
                        break;
                    case "unfollow":
                        $result["success"] = $isFollowing;
                        if ($result["success"]) {
                            $dbh->removeFollower($username, $followed_user);
                        } else {
                            $result["errormsg"] = "Tried to unfollow not followed user";
                        }
                        break;
                    default:
                        $result["errormsg"] = "Uknown action";
                        break;
                }
            } else {
                $result["action"] = "action not set";
            }
        } else {
            $result["errormsg"] = "Users can't follow themselves";
        }
    } else {
        $result["errormsg"] = "followed_user not set";
    }
} else {
    $result["errormsg"] = "User not logged";
}

header("Content-Type: application/json");
echo(json_encode($result));
?>