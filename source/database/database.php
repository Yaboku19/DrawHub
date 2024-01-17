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
                user (username, email, password, bio, urlProfilePicture, birthDate, name, surname)
                VALUES (?, ?, ?,' ', 'defaultImage.png', ?, ?, ?);");
        $user_query->bind_param("ssssss", $username, $email, $passw, $birthDate, $name, $surname);
        $result = $user_query->execute();
        return $result == true;
    }

    public function getUserInfo($username) {
        $stmt = $this->db->prepare("SELECT * FROM user WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        echo($result->num_rows);
        return $result->fetch_all(MYSQLI_ASSOC)[0];
    }

    public function getPosts($id, $n) { //da sistemare
        $stmt = $this->db->prepare("SELECT P.*, U.urlProfilePicture FROM post P, user U WHERE P.user = U.username;");
        //$stmt->bind_param("si",$id, $n);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostComments($post_id){ //da sistemare
        $stmt = $this->db->prepare("SELECT COUNT(*) AS comment FROM comment WHERE post_id = ?");
        $stmt->bind_param("s", $post_id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC)[0]["comment"];
    }

    public function getAllReactionCount($post_id) {
        $allReactionsType = $this->getAllReactionType(); 
        foreach ($allReactionsType as $reactionType) {
            $result["num_".$reactionType["typeID"]] = $this->countPostReactionType($post_id, $reactionType["typeID"]);
        }
        return $result;
    }

    /**
     * restituisce tutti i tipi di reaction
     */
    public function getAllReactionType() {
        $result = $this->db->query("SELECT typeID FROM reactionType;");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function countPostReactionType($post_id, $reactionType){ //da sist
        $stmt = $this->db->prepare("SELECT COUNT(*) AS info FROM post, user,  WHERE post_id = ? AND reaction_id = ?");
        $stmt->bind_param("ss", $post_id, $reactionType);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC)[0]["info"];
    }

    public function getSearchResult($search_term) {
        $stmt = $this->db->prepare("SELECT * FROM user WHERE username LIKE CONCAT(\"%\", ?, \"%\") 
            OR surname LIKE CONCAT(\"%\", ?, \"%\") OR CONCAT(name, \" \", surname) LIKE CONCAT(\"%\", ?, \"%\")");
        $stmt->bind_param("sss", $search_term, $search_term, $search_term);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addPost($author, $description, $img, $originalPost){
        $data = date("Y-m-d");
        if ($originalPost == "") {
            $stmt = $this->db->prepare("INSERT INTO post (user, description, urlImage, datePost) VALUES (?, ?, ?, ?);");
            $stmt->bind_param("ssss", $author, $description, $img, $data);
        } else {
            $stmt = $this->db->prepare("INSERT INTO post (user, description, urlImage, datePost, originalPostId) VALUES (?, ?, ?, ?, ?);");
            $stmt->bind_param("sssss", $author, $description, $img, $data, $originalPost);
        }
        $result = $stmt->execute();
        return $result;
    }
}
?>