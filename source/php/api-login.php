<?php
require_once("db_config.php");
$result["login-result"] = false;
$result["login-error"] = "";


if(isset($_POST["email"]) && isset($_POST["password"])) {
  $storedHash = $dbh->getPasswordFromDB($_POST["email"]);

  $result["test"] = "arrivoqui";
  $result["hash"] = $storedHash[0]["password"];
  try {
  if(password_verify($_POST["password"], $storedHash[0]["password"])) {
    $login_result = $dbh->login($_POST["email"], $storedHash[0]["password"]);
    if(count($login_result) != 0) {
      $result["login-result"] = true;
      //$_SESSION["user-id"] = array_column($login_result, "username")[0];
      registerLoggedUser(array_column($login_result, "username")[0]);
    } else {
      $result["login-error"] = "Email or Password wrong!";
    }
  } else {
    $result["login-error"] = "Hash errato";
  }
} catch(Exception $e){
  echo $e->getMessage();
  $result["catch"] = $e->getMessage();
}
}

header('Content-Type: application/json');
echo json_encode($result);

?>