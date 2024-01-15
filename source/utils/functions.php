<php 

function registerLoggedUser($user_id) {
  $_SESSION["user_id"] = $user_id;
}

?>