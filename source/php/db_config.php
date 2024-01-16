<?php
require_once("../database/database.php");
require_once("../utils/function.php");
$dbh = new DatabaseHelper("localhost", "root", "", "drawhub", 3306);
define("UPLOAD_DIR", "../img/");
?>