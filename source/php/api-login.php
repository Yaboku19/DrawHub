<?php
require_once("db_config.php");
$result["login-result"] = false;
$result["login-error"] = "";


if(isset($_POST["username"]) && isset($_POST["password"])) {
  $storedHash = $dbh->getPasswordFromDB($_POST["username"]);
  if($dbh->checkValueInDb("user", "username", $_POST["username"])) {
    try {
      if(password_verify($_POST["password"], $storedHash[0]["password"])) {
        $login_result = $dbh->login($_POST["username"], $storedHash[0]["password"]);
        if(count($login_result) != 0) {
          $result["login-result"] = true;
          registerLoggedUser(array_column($login_result, "username")[0]);
        } else {
          $result["login-error"] = "Username o Password errati";
        }
      } else {
        $result["login-error"] = "Password errata";
      }
    } catch(Exception $e){
      $result["catch"] = $e->getMessage();
    }
  } else {
    $result["login-error"] = "Username non valido";
  }
}

header('Content-Type: application/json');
echo json_encode($result);

?>