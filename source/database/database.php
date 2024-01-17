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

    public function getPostComments($postID){ //da sistemare
        $stmt = $this->db->prepare("SELECT COUNT(*) AS comment FROM comment C WHERE C.postID = ?");
        $stmt->bind_param("i", $postID);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC)[0]["comment"];
    }

    public function getAllReactionCount($post_id) {
        $allReactionsType = $this->getAllReactionType(); 
        foreach ($allReactionsType as $reactionType) {
            $result[$reactionType["typeID"]] = $this->countPostReactionType($post_id, $reactionType["typeID"]);
        }
        return $result;
    }

    public function countPostReactionType($post_id, $reactionType){ //da sist
        $stmt = $this->db->prepare("SELECT COUNT(*) AS info FROM post P, reaction R  WHERE R.postID=P.postID AND P.postID = ? AND R.typeID = ?");
        $stmt->bind_param("is", $post_id, $reactionType);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC)[0]["info"];
    }

    /**
     * restituisce tutti i tipi di reaction
     */
    public function getAllReactionType() {
        $result = $this->db->query("SELECT typeID FROM reactionType;");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getSearchResult($search_term) {
        $stmt = $this->db->prepare("SELECT * FROM user WHERE username LIKE CONCAT(\"%\", ?, \"%\") 
            OR surname LIKE CONCAT(\"%\", ?, \"%\") OR CONCAT(name, \" \", surname) LIKE CONCAT(\"%\", ?, \"%\")");
        $stmt->bind_param("sss", $search_term, $search_term, $search_term);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addReaction($username, $postID, $reactionType) {
        $stmt = $this->db->prepare("INSERT INTO reaction (user, typeID, postID) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $username, $postID, $reactionType);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }

    public function removeReaction($username, $postID, $reactionType) {
        $stmt = $this->db->prepare("DELETE FROM reaction R WHERE R.user=? AND R.typeID=? AND R.postID=?");
        $stmt->bind_param("ssi", $username, $postID, $reactionType);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }

    public function isReactionAlreadyPresent($username, $postID, $reactionType) {
        $stmt = $this->db->prepare("SELECT count(*) AS reactionCount FROM reaction R WHERE R.user=? AND R.typeID=? AND R.postID=?");
        $stmt->bind_param("ssi", $username, $postID, $reactionType);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC)[0]["reactionCount"] > 0;
    }
}
?>