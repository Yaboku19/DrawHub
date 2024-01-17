INSERT INTO drawHub.user (username, password, bio, urlProfilePicture, birthDate, email, name, surname)
VALUES ('marcorossi', 'marcorossi', 'Questa è la mia bio.', 'defaultImage.png', '1990-01-01', 'utente1@example.com', 'marco', 'rossi');

INSERT INTO drawHub.user (username, password, bio, urlProfilePicture, birthDate, email, name, surname)
VALUES ('mariobalo', 'mariobalo', 'Descrizione 2.', 'defaultImage.png', '1985-05-15', 'utente2@example.com', 'mario', 'balotelli');

INSERT INTO drawHub.post (user, postID, description, urlImage)
VALUES ('mariobalo', 1, 'Descrizione del primo post.', 'prova.jpg');

INSERT INTO drawHub.post (user, postID, description, urlImage)
VALUES ('utente1', 1, 'Descrizione del secondo post.', 'prova.jpg');

