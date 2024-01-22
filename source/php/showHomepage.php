<?php
require_once("db_config.php");

$templateParams["title"]="Homepage";
$templateParams["homepage"] = "link-secondary";
$templateParams["notifications"] = "";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../js/updateNotification.js", "../js/homePage.js", "../js/post.js");

require("../template/base.php");
?>