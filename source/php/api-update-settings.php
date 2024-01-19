<?php
require_once("db_config.php");

$result["success"] = false;

if(isset($_SESSION["username"])) {
  $userInfo = $dbh->getUserInfo($_SESSION["username"]);
  //$user = $dbh->getUserById($_SESSION["username"]);
  //code for change the bio
  /*$result["success"] = true;
  $result["userInfo"] = $userInfo;*/
  if(isset($_POST["bio"]) && $_POST["bio"] != $userInfo["bio"]) {
    $result["success"] = true;
    $dbh->updateBio($_SESSION["username"], $_POST["bio"]);
  }

  //code for change profile image
  if(isset($_FILES["img"]) && $_FILES["img"] != null && $_FILES["img"]['name'] != $userInfo["urlProfilePicture"]) {
    list($success, $img) = uploadImage(UPLOAD_DIR, $_FILES["img"]);
    if($success == 1) {
      $result["success"] = true;
      $dbh->setProfileImage($img, $_SESSION["username"]);
    }
  }

  //code for change email
  if(isset($_POST["email"]) && $_POST["email"] != $userInfo["email"]) {
    $result["test"]= "dentro primo if";
    if($_POST["email"] != null) {
      $result["success"] = true;
      $dbh->updateEmail($_SESSION["username"], $_POST["email"]);
    } 
  }
  
   //code for change password
   if(isset($_POST["password"]) && $_POST["password"] != $userInfo["password"] && strlen($_POST["password"]) != 0) {
    if(strlen($_POST["password"]) >= 8 && strlen($_POST["password"]) <= 16) {
      $result["success"] = true;
      $dbh->updatePassword($_SESSION["username"], $_POST["password"]);
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