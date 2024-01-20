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

    public function getPostbyId($postID) {
        $stmt = $this->db->prepare("SELECT * FROM post WHERE postID = ?");
        $stmt->bind_param("i", $postID);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC)[0];
    }

    public function removePost($postID) {
        $stmt = $this->db->prepare("DELETE FROM post WHERE postID = ?");
        $stmt->bind_param("i", $postID);
        return $stmt->execute();
    }

    public function updatePost($postId, $descrizione) {
        $stmt = $this->db->prepare("UPDATE post SET description = ?  WHERE postID = ?");
        $stmt->bind_param("si", $descrizione, $postId);
        return $stmt->execute();
    }

    public function getPasswordFromDB($email) {
        $stmt = $this->db->prepare("SELECT password FROM user U WHERE U.email = ?");
        $stmt->bind_param("s", $email,);
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

        //return $result->num_rows; 
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
        return $result->fetch_all(MYSQLI_ASSOC)[0];
    }

    /**
     * Prende i post diegli utenti anche di chi non segue, tranne
     * quelli dell'utente loggato
     */
    public function getExplorePosts($username, $n) { 
        $stmt = $this->db->prepare("SELECT P.*, U.urlProfilePicture FROM post P
        JOIN user U ON P.user = U.username WHERE U.username <> ? ORDER BY  P.datePost DESC
        LIMIT ?;");
        $stmt->bind_param("si",$username, $n);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getHomePosts($username, $n) { 
        $stmt = $this->db->prepare("SELECT P.*, U.urlProfilePicture FROM post P
        JOIN user U ON P.user = U.username WHERE U.username 
        IN (SELECT user AS username FROM follow WHERE followerUser = ?) ORDER BY  P.datePost DESC LIMIT ? ;");
        $stmt->bind_param("si", $username, $n);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Prende post che non ho gia visualizzato, che non sono quelli che ha postato
     *  l'utente, da usare nell'esplora
     */
    public function getMoreExplorePosts($username, $posts, $numeropost) { 
        $placeholders = implode(',', array_fill(0, (count($posts)), '?'));
        $stmt1 = "(SELECT U.username FROM user U WHERE U.username <> '".$username."') ORDER BY  P.datePost DESC LIMIT ".strval($numeropost)." ;";

        $stmt = $this->db->prepare("SELECT P.*, U.urlProfilePicture FROM post P, user U WHERE P.user = U.username AND P.postID NOT IN ( $placeholders ) AND P.user IN ".$stmt1);
        $stmt->bind_param(str_repeat('i', (count($posts))), ...$posts);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Prende i post degli utenti che segue
     */
    public function getMoreHomePosts($username, $posts, $numeropost) { //da fare
        $placeholders = implode(',', array_fill(0, (count($posts)), '?'));
        $stmt1 = "(SELECT user AS username FROM follow WHERE followerUser = '".$username."') ORDER BY  P.datePost DESC LIMIT ".strval($numeropost)." ;";

        $stmt = $this->db->prepare("SELECT P.*, U.urlProfilePicture FROM post P, user U WHERE P.user = U.username AND P.postID NOT IN ( $placeholders ) AND P.user IN ".$stmt1);
        $stmt->bind_param(str_repeat('i', (count($posts))), ...$posts);
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

    public function updateBio($username, $bio) {
        $stmt = $this->db->prepare("UPDATE user SET bio=? WHERE username=?");
        $stmt->bind_param("ss", $bio, $username);
        return $stmt->execute();
    }

    public function updateEmail($username, $newEmail) {
        $stmt = $this->db->prepare("UPDATE user SET email=? WHERE username=?");
        $stmt->bind_param("ss", $newEmail, $username);
        return $stmt->execute();
    }

    public function updatePassword($username, $newPassword) {
        $stmt = $this->db->prepare("UPDATE user U SET U.password = ? WHERE U.username = ?");
        $stmt->bind_param("ss", $newPassword, $username);
        return $stmt->execute();
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
     * Given a username returns the number of followers that user has
     */
    public function getFollowerCount($username) {
        $stmt = $this->db->prepare("SELECT COUNT(*) AS follower_count FROM follow WHERE user = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC)[0]["follower_count"];
    }

    /**
     * Given username returns il numero di seguiti
     */
    public function getFollowedCount($username) {
        $stmt = $this->db->prepare("SELECT COUNT(*) AS followed_count FROM follow WHERE followerUser = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC)[0]["followed_count"];
    }

    /**
     * Returns the followers of the user with the given username
     */
    public function getFollowers($username) {
        $stmt = $this->db->prepare("SELECT followerUser AS username FROM follow WHERE user = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Returns the users followed by the user with the given username
     */
    public function getFollowing($username) {
        $stmt = $this->db->prepare("SELECT user AS username FROM follow WHERE followerUser = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * aggiunge nella tabella follow la relazione tra l'user_followed(utente seguito) e user_follower(utente che vuole seguire)
     */
    public function addFollower($user_follower, $user_followed) {
        $stmt = $this->db->prepare("INSERT INTO follow (followerUser, user) VALUES (?, ?)");
        $stmt->bind_param("ss", $user_follower, $user_followed);
        $result = $stmt->execute();
        return $result && $this->addFollowerNotification($user_followed, $user_follower);
    }

    /**
     * Rimuovo la relazione tra l'user_followed(utente seguito) e user_follower(utente che non vuole più seguire)
     */
    public function removeFollower($user_follower, $user_followed) {
        $stmt = $this->db->prepare("DELETE FROM follow WHERE followerUser = ? AND user = ?");
        $stmt->bind_param("ss", $user_follower, $user_followed);
        return $stmt->execute() && $this->removeFollowerNotification($user_followed, $user_follower);
    }

    /**
     * dato l'utente conta il numero di post caricati
     */
    public function getPostCountFromUser($username) {
        $stmt = $this->db->prepare("SELECT COUNT(*) AS post_count FROM post WHERE user = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC)[0]["post_count"];
    }

    /**
     * Returns all posts made by the user with the given username
     * The are ordered from the most recent to the least recent
     */
    public function getAllUserPosts($username) {
        $stmt = $this->db->prepare("SELECT * FROM post WHERE user = ? ORDER BY datePost DESC");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * verifico se loggedUser (utente attuale) segue user
     */
    public function isUserFollowing($loggedUser, $user) {
        $stmt = $this->db->prepare("SELECT * FROM follow WHERE followerUser = ? AND user = ?");
        $stmt->bind_param("ss", $loggedUser, $user);
        $stmt->execute();
        $result = $stmt->get_result();
        return !empty($result->fetch_all(MYSQLI_ASSOC));
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
    public function addReaction($username, $postID, $reactionType) {
        $stmt = $this->db->prepare("INSERT INTO reaction (user, typeID, postID) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $username, $reactionType, $postID);
        $result = $stmt->execute();
        return $result && $this->addReactionNotification($username, $postID, $reactionType);
    }

    public function removeReaction($username, $postID, $reactionType) {
        $stmt = $this->db->prepare("DELETE FROM reaction WHERE `reaction`.`user` = ? AND `reaction`.`typeID` = ? AND `reaction`.`postID` = ?");
        $stmt->bind_param("ssi", $username, $reactionType, $postID);
        $result = $stmt->execute();
        return $result;
    }

    /**
     * Per ogni reazione restituisce se l'utente ha già messo like nel post di $post_id
     */
    public function hasReactedAll($username, $post_id) {
        $reactions = $this->getAllReactionType();
        foreach ($reactions as $reaction) {
            $result["user_has_".$reaction["typeID"]] = $this->hasReacted($post_id, $username, $reaction["typeID"]);
        }
        return $result;
    }

    public function hasReacted($post_id, $username, $reaction_type){
        $stmt = $this->db->prepare("SELECT * FROM reaction WHERE postID = ? AND user = ? AND typeID = ?");
        $stmt->bind_param("iss", $post_id, $username, $reaction_type);
        $stmt->execute();
        $result = $stmt->get_result();
        $res = $result->fetch_all(MYSQLI_ASSOC);
        return !empty($res);
    }

    public function isReactionAlreadyPresent($username, $postID, $reactionType) {
        $stmt = $this->db->prepare("SELECT count(*) AS reactionCount FROM reaction R WHERE R.user=? AND R.typeID=? AND R.postID=?");
        $stmt->bind_param("ssi", $username, $reactionType, $postID);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC)[0]["reactionCount"] > 0;
    }

    public function getAllCommentOfAPost ($postID) {
        $stmt = $this->db->prepare("SELECT * FROM comment WHERE postID = ? ORDER BY dateComment DESC");
        $stmt->bind_param("i", $postID);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addComment($user, $postID, $text) {
        $stmt = $this->db->prepare("SELECT commentID FROM comment WHERE user = ? AND postID = ? ORDER BY 1 DESC LIMIT 1");
        $stmt->bind_param("si", $user, $postID);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $commentID = $result->fetch_all(MYSQLI_ASSOC)[0]["commentID"] + 1;
        } else {
            $commentID = 1;
        }
        $date = date("Y-m-d");
        $comment_query = $this->db->prepare("INSERT INTO 
                comment (user, postID, text, commentID, dateComment)
                VALUES (?, ?, ?, ?, ?);");
        $comment_query->bind_param("sisis", $user, $postID, $text, $commentID, $date);
        $result = $comment_query->execute();
        return  $result && $this->addCommentNotification($user, $postID, $commentID, $date);
    }

    public function deleteComment($user, $postID, $commentID) {
        $comment_query = $this->db->prepare("DELETE FROM comment WHERE user = ? AND postID = ? AND commentID = ?");
        $comment_query->bind_param("sii", $user, $postID, $commentID);
        $result = $comment_query->execute();
        return  $result;
    }

    public function setProfileImage($urlProfilePicture, $username) {
        $stmt = $this->db->prepare("UPDATE user SET urlProfilePicture=? WHERE username=?");
        $stmt->bind_param("ss", $urlProfilePicture, $username);
        return $stmt->execute();
    }

    public function getAllNewFollower($user) {
        $stmt = $this->db->prepare("SELECT newFollowerUser, dateNotification FROM newfollower WHERE user = ?");
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllNewComment($user) {
        $stmt = $this->db->prepare("select newCommentPostID, dateNotification from newcomment where user = ?");
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllNewReaction($user) {
        $stmt = $this->db->prepare("SELECT newReactionPostID, dateNotification FROM newreaction WHERE user = ?");
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    private function addCommentNotification ($newCommentUser, $newCommentPostID, $newCommentID, $date) {
        $user = $this->getPostbyId($newCommentPostID)["user"];
        $notificationID = $this->getNotificationId("newcomment", $user);
        $comment_query = $this->db->prepare("INSERT INTO 
                newcomment (user, notificationID, newCommentUser, newCommentPostID , newCommentID, dateNotification)
                VALUES (?, ?, ?, ?, ?, ?)");
        $comment_query->bind_param("sisiis", $user ,$notificationID ,$newCommentUser ,$newCommentPostID ,$newCommentID ,$date);
        $result = $comment_query->execute();
        return  $result;
    }

    private function addReactionNotification ($newReactionUser, $newReactionPostID, $newReactionTypeID) {
        $user = $this->getPostbyId($newReactionPostID)["user"];
        $notificationID = $this->getNotificationId("newreaction", $user);
        $date = date("Y-m-d");

        $comment_query = $this->db->prepare("INSERT INTO newreaction (user, notificationID, newReactionUser, newReactionTypeID, newReactionPostID, dateNotification) VALUES (?, ?, ?, ?, ?, ?)");

        $comment_query->bind_param("sissis", $user, $notificationID, $newReactionUser, $newReactionTypeID, $newReactionPostID, $date);
        $result = $comment_query->execute();

        return $result;
    }

    private function addFollowerNotification ($user, $follower) {
        $notificationID = $this->getNotificationId("newfollower", $user);
        $date = date("Y-m-d");

        $comment_query = $this->db->prepare("INSERT INTO newfollower (user, notificationID, newFollowerUser, dateNotification) 
            VALUES (?, ?, ?, ?)");
        $comment_query->bind_param("siss", $user, $notificationID, $follower, $date);
        $result = $comment_query->execute();

        return $result;
    }

    private function removeFollowerNotification($user, $follower) {
        $stmt = $this->db->prepare("SELECT notificationID FROM newfollower WHERE user = ? AND newFollowerUser = ?");
        $stmt->bind_param("ss", $user, $follower);
        $stmt->execute();
        $result = $stmt->get_result();
        $notificationID = $result->fetch_all(MYSQLI_ASSOC)[0]["notificationID"];
        $stmt = $this->db->prepare("DELETE FROM newfollower WHERE user = ? AND notificationID = ?");
        $stmt->bind_param("si", $user, $notificationID);
        return $stmt->execute();
    }

    private function getNotificationId($tableName, $user) {
        $escapedTableName = $this->db->real_escape_string($tableName);
        $stmt = $this->db->prepare("SELECT notificationID FROM $escapedTableName WHERE user = ? ORDER BY 1 DESC LIMIT 1");
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $notificationID = $result->fetch_all(MYSQLI_ASSOC)[0]["notificationID"] + 1;
        } else {
            $notificationID = 1;
        }
        return $notificationID;
    }
    
}
?>