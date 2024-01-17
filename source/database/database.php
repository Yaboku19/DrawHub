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
        $reactions = $this->getAllReactions();
        foreach ($reactions as $reaction) {
            $result["num_".$reaction["reaction_info"]] = $this->getPostReactionInfo($post_id, $reaction["reaction_id"]);
        }
        return $result;
    }

    public function hasReactedAll($user_id, $post_id) {
        $reactions = $this->getAllReactions();
        foreach ($reactions as $reaction) {
            $result["user_has_".$reaction["reaction_info"]] = $this->hasReacted($post_id, $user_id, $reaction["reaction_id"]);
        }
        return $result;
    }

    public function getAllReactions() {
        $result = $this->db->query("SELECT * FROM reaction;");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function hasReacted($post_id, $user_id, $reaction_type){
        $stmt = $this->db->prepare("SELECT * FROM post_user_reaction WHERE post_id = ? AND user_id = ? and reaction_id = ?");
        $stmt->bind_param("sss", $post_id, $user_id, $reaction_type);
        $stmt->execute();
        $result = $stmt->get_result();
        $res = $result->fetch_all(MYSQLI_ASSOC);
        return !empty($res);
    }

    public function getPostReactionInfo($post_id, $numReaction){
        $stmt = $this->db->prepare("SELECT COUNT(*) AS info FROM post_user_reaction WHERE post_id = ? AND reaction_id = ?");
        $stmt->bind_param("ss", $post_id, $numReaction);
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

    public function addPost($string, $author, $img, $exam){
        $data = date("Y-m-d");
        $id = $this->getNewId("post_id", "post");
        $stmt = $this->db->prepare("INSERT INTO post (post_id, author, string, data, esame_id, immagine) VALUES (?, ?, ?, ?, ?, ?);");
        $stmt->bind_param("ssssss", $id, $author, $string, $data, $exam, $img);
        $result = $stmt->execute();
        return $result;
    }
}
?>