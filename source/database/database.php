<?php
// in questo file ci andranno tutte le query

class DatabaseHelper{
    private $db;
    
    public function __construct($servername, $username, $password, $dbname, $port){
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed");
        }
    }

    public function __destruct()
    {
        $this->db->close();
    }

    public function login($email, $passw) {
        $stmt = $this->db->prepare("SELECT * FROM user U WHERE U.email = ? AND U.password = ?");
        $stmt->bind_param("ss", $email, $passw); //ss sta per string string
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function checkValueInDb($table, $field, $id) {
        $stmt = $this->db->prepare("SELECT * FROM $table t WHERE t.$field = ?");
        $id = strval($id);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return !empty($result->fetch_all(MYSQLI_ASSOC));
    }

    public function addUser($username, $email, $passw, $name, $surname, $birthDate) { //da sisemare
        $user_query = $this->db->prepare("INSERT INTO 
                user (username, email, password, bio, urlProfilePicture, birthDate, name, cognome)
                VALUES (?, ?, ?,' ', 'defaultImage.png', ?, ?, ?);");
        $user_query->bind_param("ssssss", $username, $email, $passw, $birthDate, $name, $surname);
        $result = $user_query->execute();
        

        return $result == true;
    }


}
?>