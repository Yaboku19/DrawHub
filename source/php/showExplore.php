<?php
require_once("db_config.php");

$templateParams["title"] = "Explore";
$templateParams["homepage"] = "";
$templateParams["notifications"] = "";
//$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../js/settings.js");
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../js/login.js");

$_SESSION["username"]=null;
require("../template/login-base.php");

//require("../template/base.php");
?>