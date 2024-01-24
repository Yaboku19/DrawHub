<?php
require_once("db_config.php");

$result["success"] = false;

if(isset($_SESSION["username"])) {
  $userInfo = $dbh->getUserInfo($_SESSION["username"]);
  if(isset($_POST["bio"]) && $_POST["bio"] != $userInfo["bio"]) {
    $result["success"] = true;
    $dbh->updateBio($_SESSION["username"], $_POST["bio"]);
  }
  if(isset($_FILES["img"]) && $_FILES["img"] != null && $_FILES["img"]['name'] != $userInfo["urlProfilePicture"]) {
    list($success, $img) = uploadImage(UPLOAD_DIR, $_FILES["img"]);
    if($success == 1) {
      $result["success"] = true;
      $dbh->setProfileImage($img, $_SESSION["username"]);
    }
  }
  if(isset($_POST["email"]) && $_POST["email"] != $userInfo["email"]) {
    if($_POST["email"] != null) {
      $result["success"] = true;
      $dbh->updateEmail($_SESSION["username"], $_POST["email"]);
    } 
  }
  if(isset($_POST["password"]) && $_POST["password"] != $userInfo["password"] && strlen($_POST["password"]) != 0) {
    if(strlen($_POST["password"]) >= 8 && strlen($_POST["password"]) <= 16) {
      $result["success"] = true;
      $hashpassword = password_hash($_POST["password"], PASSWORD_BCRYPT); //cripto la password con algoritmo BCRYPT
      $dbh->updatePassword($_SESSION["username"], $hashpassword);
    } else {
      $result["errormsg"] = "La password non rispetta il range di caratteri";
    }
  }

  if(empty($result["errormsg"]) && !$result["success"]) {
    $result["errormsg"] = "Non è stato cambiato nulla";
  }
}

header("Content-Type: application/json");
echo(json_encode($result));
?>