<?php
require_once("db_config.php");

$templateParams["title"]="Modifica Post";
$templateParams["homepage"] = "link-secondary";
$templateParams["notifications"] = "";
//$templateParams["js"] = array();
/*$templateParams["postID"] = $_POST["postId"];
$templateParams["description"] = $_POST["descrizione"];*/
/*$templateParams["postID"] = $_GET["postId"];
$templateParams["description"] = $_GET["descrizione"];*/
$_SESSION["postID"] = $_GET["postId"];
$_SESSION["description"] = $_GET["descrizione"];
if(isset($_GET["errormsg"])) {
    $_SESSION["errormsg"] = $_GET["errormsg"];
}
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "../js/updateNotification.js", "../js/modify-post.js");
//$templateParams["name"] = "show-modify-post.php";

require("../template/base.php");
?>