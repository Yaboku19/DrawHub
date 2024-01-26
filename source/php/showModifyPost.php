<?php
require_once("db_config.php");

$templateParams["title"]="Modifica Post";
$templateParams["homepage"] = "link-secondary";
$templateParams["notifications"] = "";
$_SESSION["postID"] = $_GET["postId"];
$_SESSION["description"] = $_GET["descrizione"];
if(isset($_GET["errormsg"])) {
    $_SESSION["errormsg"] = $_GET["errormsg"];
}
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../js/updateNotification.js", "../js/modify-post.js");

require("../template/base.php");
?>