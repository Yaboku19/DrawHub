<?php
require_once("db_config.php");

$templateParams["title"] = "Explore";
$templateParams["homepage"] = "";
$templateParams["notifications"] = "";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","../js/explore.js", "../js/updateNotification.js", "../js/post.js");

require("../template/base.php");
?>