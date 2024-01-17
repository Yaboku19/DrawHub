INSERT INTO drawHub.user (username, password, bio, urlProfilePicture, birthDate, email, name, surname)
VALUES ('marcorossi', 'marcorossi', 'Questa è la mia bio.', 'defaultImage.png', '1990-01-01', 'utente1@example.com', 'marco', 'rossi');

INSERT INTO drawHub.user (username, password, bio, urlProfilePicture, birthDate, email, name, surname)
VALUES ('mariobalo', 'mariobalo', 'Descrizione 2.', 'defaultImage.png', '1985-05-15', 'utente2@example.com', 'mario', 'balotelli');

INSERT INTO drawHub.post (user, description, urlImage, datepost)
VALUES ('mariobalo', 'Descrizione del primo post.', 'prova.jpg', '2024-01-17');

INSERT INTO drawHub.post (user, description, urlImage, datePost)
VALUES ('marcorossi', 'Descrizione del secondo post.', 'prova.jpg', '2024-01-17');

INSERT INTO drawHub.reactionType (typeID, tagImage)
VALUES ("cuore", "bi-heart-fill");

INSERT INTO drawHub.reactionType (typeID, tagImage)
VALUES ("occhi_a_cuore", "bi-emoji-heart-eyes-fill");

INSERT INTO drawHub.reactionType (typeID, tagImage)
VALUES ("occhi_neutri", "bi-emoji-neutral-fill");

INSERT INTO drawHub.reactionType (typeID, tagImage)
VALUES ("pollice_giu", "bi-hand-thumbs-down-fill");

