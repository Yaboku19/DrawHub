<?php
require_once("db_config.php");

$templateParams["title"] = "Search";
$templateParams["homepage"] = "";
$templateParams["notifications"] = "";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../js/search.js");

require("../template/base.php");
?>