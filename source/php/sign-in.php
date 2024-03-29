<?php
require_once("db_config.php");

require __DIR__ . '\PHPMailer\src\PHPMailer.php';
require __DIR__ . '\PHPMailer\src\SMTP.php';
require __DIR__ . '\PHPMailer\src\Exception.php';

use PHPMailer\PHPMailer\PHPMailer;


$mail = new PHPMailer();
$mail->isSMTP();
$mail->Host = 'smtp.libero.it';
$mail->SMTPAuth = true;
$mail->Username = 'drawhub@libero.it';
$mail->Password = 'Drawhub!2024';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$result["sign-in-result"] = false;

$date = new DateTime('now');
$date->modify("-14 years");
$date = date_format($date, "Y-m-d");
if(isset($_POST["username"], $_POST["email"], $_POST["password"], $_POST["name"], $_POST["surname"], $_POST["date"])) {
  $check_id = $dbh->checkValueInDb("user", "username", $_POST["username"]);
  $check_email = $dbh->checkValueInDb("user", "email", $_POST["email"]);
  if(!$check_id && !$check_email) { //se non è gia presente nel database
    if(!empty($_POST["username"])) {
      if(!empty($_POST["email"])) {
        if(strlen($_POST['password']) >= 8 && strlen($_POST['password']) <= 16) {
          if(!empty($_POST["name"])) {
            if(!empty($_POST["surname"])) {
              if($_POST["date"] < $date) {
                $hashpassword = password_hash($_POST["password"], PASSWORD_BCRYPT); //cripto la password con algoritmo BCRYPT
                $result["hash"] = $hashpassword;
                $result["dbh"] = $dbh->addUser($_POST["username"], $_POST["email"], $hashpassword, $_POST["name"], $_POST["surname"], $_POST["date"]);
                $result["sign-in-result"] = true;
                $mail->setFrom('drawhub@libero.it', 'DrawHub');
                $mail->addAddress($_POST["email"], "DrawHub");
                $mail->Subject = 'DrawHub - Iscrizione avvenuta con successo';
                $mail->Body = 'Iscrizione avvenuta con successo';
                try {
                  $mail->send();
                  $result["email"] = 'Connessione SMTP riuscita';
                } catch (\Exception $e) {
                    $result["email"] = 'Errore nella connessione SMTP: ' . $e->getMessage();
                }
              } else {
                $result["sign-in-result"] = false;
                $result["text-error"] = "L'età minima è 14 anni";
              }
            } else {
              $result["sign-in-result"] = false;
              $result["text-error"] = "Inserire il cognome";
            }
          } else {
            $result["sign-in-result"] = false;
            $result["text-error"] = "Inserire il nome";
          }
        } else {
          $result["sign-in-result"] = false;
          $result["text-error"] = "La password deve essere tra 8-16 caratteri!";
        }
      } else {
        $result["sign-in-result"] = false;
        $result["text-error"] = "Inserire l'email";
      }

    } else {
      $result["sign-in-result"] = false;
      $result["text-error"] = "Inserire il nickname";
    }
  } else if($check_id) {
    $result["sign-in-result"] = false;
    $result["text-error"] = "Il nickame inserito esiste già";
  } else if($check_email) {
    $result["sign-in-result"] = false;
    $result["text-error"] = "L'email inserita esiste già";
  } else {
    $result["sign-in-result"] = false;
    $result["text-error"] = "Qualcosa è andato storto";
  }
}

header('Content-Type: application/json');
echo json_encode($result);

?>
