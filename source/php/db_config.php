<?php
require_once("../database/database.php");
//require_once("utils/functions.php");
$dbh = new DatabaseHelper("localhost", "root", "", "drawhub", 3307);
define("UPLOAD_DIR", "../img/")
?>