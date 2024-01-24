<?php
require_once("db_config.php");
define("FOLLOW", 1);

$result["success"] = false;

if (isset($_SESSION["username"])) {
    $username = $_SESSION["username"];
    if (isset($_POST["followed_user"])) {
        $followed_user = $_POST["followed_user"];
        if(isset($_POST["check"])){
            $result["isFollowing"] = $dbh->isUserFollowing($username, $followed_user);
            $_POST["check"] = null;
        }
        if ($username !== $followed_user) {
            if (isset($_POST["action"])) {
                $action = $_POST["action"];
                $isFollowing = $dbh->isUserFollowing($username, $followed_user);
                switch ($action) {
                    case "follow":
                        $result["success"] = !$isFollowing;
                        if ($result["success"]) {
                            $dbh->addFollower($username, $followed_user);
                        } else {
                            $result["errormsg"] = "Non puoi seguire un utente già seguito";
                        }
                        break;
                    case "unfollow":
                        $result["success"] = $isFollowing;
                        if ($result["success"]) {
                            $dbh->removeFollower($username, $followed_user);
                        } else {
                            $result["errormsg"] = "Provando unfollow su un utente non seguito";
                        }
                        break;
                    default:
                        $result["errormsg"] = "azione sconosciuta";
                        break;
                }
            } else {
                $result["action"] = "azione non settata";
            }
        } else {
            $result["errormsg"] = "Non puoi seguire te stesso";
        }
    } else {
        $result["errormsg"] = "followed_user non settato";
    }
} else {
    $result["errormsg"] = "User non loggato";
}

header("Content-Type: application/json");
echo(json_encode($result));
?>