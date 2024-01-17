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

        /** 
     * add a post to the db
    */   
    public function addPost($string, $author, $img, $exam){
        $data = date("Y-m-d");
        //$id = $this->getNewId("post_id", "post");
        $stmt = $this->db->prepare("INSERT INTO post (user, postID, description, urlImage, originalPostUser, originalPostid) VALUES (?, ?, ?, ?, ?, ?);");
        $stmt->bind_param("ssssss", $id, $author, $string, $data, $exam, $img);
        $result = $stmt->execute();
        return $result;
    }

    public function getUserInfo($username){
        $stmt = $this->db->prepare("SELECT * from users WHERE username = ?;");
        $stmt->bind_param("s", $username);
        $result = $stmt->execute();
        return $result;
    }

}
?>