<?php
require_once 'db_config.php';

$templateParams["title"] = "Login";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","../js/login.js");

if(isset($_SESSION["username"])) {
  $_SESSION["username"] = null;  //viene ANNULLATA la variabile session {unset($_SESSION);}
}

require '../template/login-base.php';
?>