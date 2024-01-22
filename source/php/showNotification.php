<?php
require_once("db_config.php");

$templateParams["title"] = "Notification";
$templateParams["homepage"] = "";
$templateParams["notifications"] = "";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../js/updateNotification.js" ,"../js/notification.js");

require("../template/base.php");
?>