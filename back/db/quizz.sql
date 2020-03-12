DROP TABLE IF EXISTS quizz;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS scores;

PRAGMA foreign_keys = ON;

CREATE TABLE quizz (
  id INTEGER NOT NULL PRIMARY KEY,
  creator_id INTEGER,
  name TEXT,
  picture_url TEXT,
  category INTEGER,
  difficulty INTEGER,
  creation_date INTEGER
);

CREATE TABLE questions (
  id INTEGER NOT NULL PRIMARY KEY,
  quizz_id INTEGER,
  sentence TEXT NOT NULL,
  video_url TEXT,
  score INTEGER,
  category INTEGER
);

CREATE TABLE answers (
  id INTEGER NOT NULL PRIMARY KEY,
  question_id INTEGER,
  sentence TEXT,
  picture_url TEXT check((sentence IS NULL AND picture_url IS NOT NULL) OR (sentence IS NOT NULL AND picture_url IS NULL)),
  solution INTEGER check(solution in (0,1))
);

CREATE TABLE category (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT
);

CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY,
  login TEXT,
  password TEXT,
  picture_url TEXT,
  remember INTEGER
);

CREATE TABLE votes (
  id INTEGER NOT NULL PRIMARY KEY,
  user_id INTEGER,
  quizz_id INTEGER,
  vote INTEGER check(vote in (1,2,3,4,5))
);

CREATE TABLE scores (
  id INTEGER NOT NULL PRIMARY KEY,
  user_id INTEGER,
  quizz_id INTEGER,
  score INTEGER
);




INSERT INTO category (name)
VALUES
   ("Webdesign"),
   ("Motion Design"),
   ("Game Design"),
   ("Print");

INSERT INTO users (login, password, picture_url, remember)
VALUES
   ("ADMIN", "ADMIN", "", 0);

INSERT INTO votes (user_id, quizz_id, vote)
VALUES
  (1, 1, 2),
  (1, 2, 2),
  (1, 3, 2),
  (1, 4, 2);

INSERT INTO scores (quizz_id, user_id,  score)
  VALUES
    (1, 1, 5),
    (2, 1, 5),
    (3, 1, 5),
    (4, 1, 5);


INSERT INTO quizz (creator_id, name, picture_url,category, difficulty, creation_date)
VALUES
   (1, "C'est quoi le webdesign ?","quizz01.jpg", 0, 1, 0),
   (1, "Les bases du motion design ?","quizz01.jpg", 1, 1, 0),
   (1, "C'est quoi le game design ?","quizz01.jpg", 2, 1, 0),
   (1, "Les bases du print.","quizz01.jpg", 3, 1, 0);

INSERT INTO questions (quizz_id, sentence, video_url, score, category)
VALUES

   (1, "Quel ensemble de mots traduit le mieux Webdesign ?", NULL, 1, 0),
   (1, "Dans le numérique , quel mot peut remplacer Design ?", NULL, 1, 0),
   (1, "Le webdesign c’est aussi gérer la cohérence des couleurs", NULL, 1, 0),
   (1, "Le webdesign c’est aussi générer une base de données", NULL, 1, 0),
   (1, "Quel technique se rapporte au webdesign ?", NULL, 1, 0),
   (2, "Quel graphiste américain associe t-on au motion design ?", NULL, 1, 1),
   (2, "Quel logiciel sert à faire de l’animation vidéo ?", NULL, 1, 1),
   (2, "Le motion design est basé sur l’illusion de  mouvement ?", NULL, 1, 1),
   (2, "La réalité virtuelle est un domaine du motion design ?", NULL, 1, 1),
   (2, "Technologie qu’on retrouve dans le motion design ?", NULL, 1, 1),
   (3, "Lequel est un éditeur de niveau ?", NULL, 1, 2),
   (3, "Le game designer conçoit", NULL, 1, 2),
   (3, "Quel métier se rapproche le plus du game design ?", NULL, 1, 2),
   (3, "Qui crée les différents niveaux du jeu ?", NULL, 1, 2),
   (3, "Combien gagne environ un game designer débutant ?", NULL, 1, 2),
   (4, "Quel matière  est la plus utilisé en imprimerie ?", NULL, 1, 3),
   (4, "L’ensemble des techniques qui interviennent dans l’imprimerie est appelé", NULL, 1, 3),
   (4, "Lequel de ces produits est issu du print ?", NULL, 1, 3),
   (4, " Le premier livre imprimé en France ", NULL, 1, 3),
   (4, "L’ancêtre de l’imprimerie ?", NULL, 1, 3);



INSERT INTO answers (question_id, sentence, picture_url, solution)
VALUES
   (1, "Survoler et dessiner", NULL, 0),
   (1, "Toile et dessiner", NULL, 1),
   (1, "Navigation et plûme", NULL, 0),
   (1, "Souris et dessin", NULL, 0),
   (2, "Graphisme", NULL, 1),
   (2, "Dessin", NULL, 0),
   (2, "Croquis", NULL, 0),
   (2, "Maquette", NULL, 0),
   (3, "Vrai", NULL, 1),
   (3, "Faux", NULL, 0),
   (3, "", NULL, 0),
   (3, "", NULL, 0),
   (4, "Vrai", NULL, 0),
   (4, "Faux", NULL, 1),
   (4, "-", NULL, 0),
   (4, "-", NULL, 0),
   (5, "Echographie", NULL, 0),
   (5, "Iconographie", NULL, 1),
   (5, "Hameçonnage", NULL, 0),
   (5, "SQL", NULL, 0),

   (6, NULL, "Aix/elon.jpg", 0),
   (6, NULL, "Aix/saul.jpg", 1),
   (7, "Adobe After Effects", NULL, 1),
   (7, "Adobe Photoshop", NULL, 0),
   (7, "Visual Studio Code", NULL, 0),
   (7, "Brackets", NULL, 0),
   (8, "Vrai", NULL, 1),
   (8, "Faux", NULL, 0),
   (8, "-", NULL, 0),
   (8, "-", NULL, 0),
   (9, "Vrai", NULL, 1),
   (9, "Faux", NULL, 0),
   (9, "-", NULL, 0),
   (9, "-", NULL, 0),
   (10, "Responsive design", NULL, 0),
   (10, "3D", NULL, 1),
   (10, "Graffiti", NULL, 0),
   (10, "Hacking", NULL, 0),

   (11, "Atom", NULL, 0),
   (11, "Word", NULL, 0),
   (11, "Indesign", NULL, 0),
   (11, "Bungie's", NULL, 1),
   (12, "Le code du jeu", NULL, 0),
   (12, "Les règles et l'univers du jeu", NULL, 1),
   (12, "La carte graphique", NULL, 0),
   (12, "Le dossier de presse", NULL, 0),
   (13, "Intégrateur", NULL, 0),
   (13, "Webdesigner", NULL, 0),
   (13, "Prof à l'IUT de Lens", NULL, 0),
   (13, "Level Designer", NULL, 1),
   (14, "Level Designer", NULL, 1),
   (14, "Tout le monde", NULL, 0),
   (14, "Mario", NULL, 0),
   (14, "Programmeur", NULL, 0),
   (15, "800€ par mois", NULL, 0),
   (15, "5000€ par mois", NULL, 0),
   (15, "200000€ par an", NULL, 0),
   (15, "1500€ par mois", NULL, 1),

   (16, "Papier", NULL, 1),
   (16, "Coton", NULL, 0),
   (16, "Fer", NULL, 0),
   (16, "Aluminium", NULL, 0),
   (17, "Processus technique", NULL, 0),
   (17, "Chaîne technique", NULL, 0),
   (17, "Processus graphique", NULL, 0),
   (17, "Chaîne graphique", NULL, 1),
   (18, "Post Facebook", NULL, 0),
   (18, "Site Web", NULL, 0),
   (18, "Billets de banque", NULL, 1),
   (18, "Livre numérique", NULL, 0),
   (19, "La légende dorée", NULL, 1),
   (19, "Ainsi parlait Zarathoustra", NULL, 0),
   (19, "Le père Goriot", NULL, 0),
   (19, "Le prince", NULL, 0),
   (20, "Le scribe", NULL, 1),
   (20, "Le téléphone", NULL, 0),
   (20, "Le numérique", NULL, 0),
   (20, "Les réseaux sociaux", NULL, 0);
