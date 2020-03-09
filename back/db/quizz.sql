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
  quizzes_id INTEGER REFERENCES quizzes(id),
  sentence TEXT NOT NULL,
  video_url TEXT,
  score INTEGER,
  category INTEGER
);

CREATE TABLE answers (
  id INTEGER NOT NULL PRIMARY KEY,
  questions_id INTEGER REFERENCES questions(id),
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
  user_id INTEGER REFERENCES user(id),
  quizz_id INTEGER REFERENCES quizz(id),
  vote INTEGER check(vote in (1,5))
);

CREATE TABLE scores (
  id INTEGER NOT NULL PRIMARY KEY,
  user_id INTEGER REFERENCES user(id),
  quizz_id INTEGER REFERENCES quizz(id),
  score INTEGER
);

INSERT INTO category (name)
VALUES
   ("Webdesign"),
   ("Motion Design"),
   ("Game Design"),
   ("Print");

INSERT INTO quizz (creator_id, name, picture_url,category, difficulty, creation_date)
VALUES
   (0, "Test", "Aix/aix.jpg", 0, 1, 1583763011);

INSERT INTO questions (quizzes_id, sentence, video_url, score, category)
VALUES
   (1, "where is brian?", NULL, 1, 1),
   (1, "who is brian?", NULL, 1, 1);

INSERT INTO answers (questions_id, sentence, picture_url, solution)
VALUES
   (1, "in the living room", NULL, 0),
   (1, "in the kitchen", NULL, 1),
   (1, "in the garden", NULL, 0),
   (1, "in the bathroom", NULL, 0),
   (2, NULL, "Aix/euroNight1.jpg", 0),
   (2, NULL, "Aix/festival1.jpg", 1),
   (2, NULL, "Aix/granet1.jpg", 0);
