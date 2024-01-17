CREATE SCHEMA drawHub;

CREATE TABLE drawHub.user ( 
    username                VARCHAR(30)     NOT NULL    PRIMARY KEY,
    password                VARCHAR(30)     NOT NULL,
    bio                     VARCHAR(200)    NOT NULL,
    urlProfilePicture       VARCHAR(100)    NOT NULL,
    birthDate               Date            NOT NULL,
    email                   varchar(25)     NOT NULL,
    name                    varchar(15)     NOT NULL,
    surname                 varchar(15)     NOT NULL
) engine=InnoDB;

CREATE TABLE drawHub.follow (
    followerUser            VARCHAR(30)     NOT NULL,
    user                    VARCHAR(30)     NOT NULL,
    PRIMARY KEY (user, followerUser),
    CONSTRAINT FK_Follow_User FOREIGN KEY (user) REFERENCES drawHub.user(username) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Follow_Follower FOREIGN KEY (followerUser) REFERENCES drawHub.user(username) ON DELETE CASCADE ON UPDATE CASCADE
) engine=InnoDB;

CREATE TABLE drawHub.post ( 
    user                    VARCHAR(30)     NOT NULL,
    postID                  INT             NOT NULL,
    description             VARCHAR(200)    NOT NULL,
    urlImage                VARCHAR(100)    NOT NULL,
    originalPostUser        VARCHAR(30),
    originalPostId          INT,
    PRIMARY KEY (user, postID),
    CONSTRAINT FK_Post_Author FOREIGN KEY (user) REFERENCES drawHub.user(username) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Post_OriginalPost FOREIGN KEY (originalPostUser, originalPostId) REFERENCES drawHub.post(User, postID) ON DELETE CASCADE ON UPDATE CASCADE
) engine=InnoDB;

CREATE TABLE drawHub.comment (
    user                    VARCHAR(30)     NOT NULL,
    postUser                VARCHAR(30)     NOT NULL,
    postID                  INT             NOT NULL,
    text                    VARCHAR(100)    NOT NULL,
    commentID               INT             NOT NULL,
    PRIMARY Key (user, postID, postUser, commentID),
    CONSTRAINT FK_Comment_Author FOREIGN KEY (user) REFERENCES drawHub.user(username) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Comment_Post FOREIGN KEY (postUser, postID) REFERENCES drawHub.post(user, postID) ON DELETE CASCADE ON UPDATE CASCADE
) engine=InnoDB;

CREATE TABLE drawHub.reactionType (
    typeID                  INT             NOT NULL    PRIMARY KEY,
    urlImmage               VARCHAR(100)    NOT NULL
) engine=InnoDB;

CREATE TABLE drawHub.reaction (
    user                    VARCHAR(30)     NOT NULL,
    typeID                  INT             NOT NULL,
    postUser                VARCHAR(30)     NOT NULL,
    postID                  INT             NOT NULL,
    PRIMARY KEY (user, typeID, postUser, postID),
    CONSTRAINT FK_Reaction_Author FOREIGN KEY (user) REFERENCES drawHub.user(username) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Reaction_Type FOREIGN KEY (typeID) REFERENCES drawHub.reactionType(typeID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Reaction_Post FOREIGN KEY (postUser, postID) REFERENCES drawHub.post(User, postID) ON DELETE CASCADE ON UPDATE CASCADE
) engine=InnoDB;

CREATE TABLE drawHub.newFollower (
    user                    VARCHAR(30)     NOT NULL,
    notificationID          INT             NOT NULL,
    newFollowerUser         VARCHAR(30)     NOT NULL,
    PRIMARY KEY (user, notificationID),
    CONSTRAINT FK_NewFollow_User FOREIGN KEY (user) REFERENCES drawHub.user(username) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_NewFollow_Follower FOREIGN KEY (newFollowerUser) REFERENCES drawHub.user(username) ON DELETE CASCADE ON UPDATE CASCADE
) engine=InnoDB;

CREATE TABLE drawHub.newComment (
    user                    VARCHAR(30)     NOT NULL,
    notificationID          INT             NOT NULL,
    newCommentUser          VARCHAR(30)     NOT NULL,
    newCommentPostUser      VARCHAR(30)     NOT NULL,
    newCommentPostID        INT             NOT NULL,
    newCommentID            INT             NOT NULL,
    PRIMARY KEY (user, notificationID),
    CONSTRAINT FK_NewComment_User FOREIGN KEY (user) REFERENCES drawHub.user(username) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_NewComment_Comment FOREIGN KEY (newCommentUser, newCommentPostID, newCommentPostUser, newCommentID) 
        REFERENCES drawHub.comment(user, postID, postUser, commentID) ON DELETE CASCADE ON UPDATE CASCADE
) engine=InnoDB;

CREATE TABLE drawHub.newReaction (
    user                    VARCHAR(30)     NOT NULL,
    notificationID          INT             NOT NULL,
    newReactionUser         VARCHAR(30)     NOT NULL,
    newReactionTypeID       INT             NOT NULL,
    newReactionPostID       INT             NOT NULL,
    newReactionPostUser     VARCHAR(30)     NOT NULL,
    PRIMARY KEY (user, notificationID),
    CONSTRAINT FK_NewReaction_User FOREIGN KEY (user) REFERENCES drawHub.user(username) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_NewReaction_Reaction FOREIGN KEY (newReactionUser, newReactionTypeID, newReactionPostUser, newReactionPostID) 
        REFERENCES drawHub.reaction(user, typeID, postUser, postID) ON DELETE CASCADE ON UPDATE CASCADE
) engine=InnoDB;