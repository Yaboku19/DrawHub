<?php
require_once("db_config.php");

$templateParams["title"]="Modifa Post";
$templateParams["homepage"] = "link-secondary";
$templateParams["notifications"] = "";
//$templateParams["js"] = array();
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../js/modify-post.js");
//$templateParams["post_info"]["postID"] = $_GET["postId"];
//$templateParams["post_info"]["description"] = $_GET["descrizione"];
/*$templateParams["postID"] = $_GET["postId"];
$templateParams["description"] = $_GET["descrizione"];
$templateParams["name"] = "show-modify-post.php";*/

require("../template/base.php");
?>