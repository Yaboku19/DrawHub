<?php
require_once 'db_config.php';

$templateParams["title"] = "Login";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","../js/login.js");
if(isset($_SESSION["user_id"])) {
  $_SESSION["user_id"] = null;  //viene ANNULLATA la variabile session {unset($_SESSION);}
}

require '../template/login-base.php';
?>