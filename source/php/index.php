<?php
require_once 'db_config.php';

if(!isset($_SESSION["username"])) {
  $templateParams["title"] = "Sign-in";
  $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","../js/sign-in.js");
  require '../template/login-base.php';
} else {
  header("location:showhomepage.php");
}
?>
