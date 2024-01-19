<?php
require_once("db_config.php");

$result["logged"] = false;

if(isset($_SESSION["username"])) {  

  $userInfo = $dbh->getUserInfo($_SESSION["username"]);
  $result["username"] = $_SESSION["username"];
  $result["bio"] = $userInfo["bio"];
  $result["urlProfilePicture"] = $userInfo["urlProfilePicture"];
  $result["email"] = $userInfo["email"];
  $result["logged"] = true;
} else {
  $result["errormsg"] = "User not logged";
}

header("Content-Type: application/json");
echo(json_encode($result));
?>