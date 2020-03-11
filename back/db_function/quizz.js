
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/quizz');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////// Quizz /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Quizz List //
function list(req, res){
  db.all( "SELECT * FROM quizz JOIN (SELECT votes.quizz_id, AVG(votes.vote) FROM votes GROUP BY votes.quizz_id) ON quizz_id = quizz.id", (err, rows) => {
    res.json(rows);
  });
}

// Particular Quizz Informations //
function info(req, res){
  db.all('SELECT * FROM quizz JOIN (SELECT votes.quizz_id, AVG(votes.vote) FROM votes GROUP BY votes.quizz_id) ON quizz_id = quizz.id WHERE quizz.id=?', [req.params.id] , (err, rows) => {
    if (err) {
      res.json(err);
    }
    res.json(rows);
  });
}

// Quizz Questions //
function questions(req, res){
  db.all('SELECT * FROM questions WHERE quizz_id=?', [req.params.id] , (err, rows) => {
    if (err) {
      res.json(err);
    }
    res.json(rows);
  });
}

// Quizz Answers //
function answers(req, res){
  db.all('SELECT answers.question_id,answers.solution,answers.sentence,answers.picture_url FROM answers JOIN questions ON questions.id = answers.question_id WHERE questions.quizz_id=?', [req.params.id] , (err, rows) => {
    if (err) {
      res.json(err);
    }
    res.json(rows);
  });
}

// Create Quizz //
function create(req, res){
  if ( req.body.creator_id && req.body.naem && req.body.picture_url && req.body.category && req.body.dificulty){
    db.run(
      "INSERT INTO quizz (creator_id, name, picture_url, category, difficulty, creation_date) VALUES (?,?,?,?,?,?)",
      [req.body.creator_id, req.body.name, req.body.picture_url, req.body.category, req.body.difficulty, 0],
      function(err){
        if (err) {
          res.json(err.message);
        }
      }
    );
    res.json("Quizz "+ req.body.name +" crée");
  }else{
    res.json("Pas de name " + req.body.name);
  }
}

// Create Question //
function create_question(req, res){
  let find_id;
  db.run(
    "INSERT INTO questions (quizz_id, sentence, video_url, score, category) VALUES (?,?,?,?,?)",
    [req.body.quizz_id, req.body.sentence, req.body.video_url, req.body.score, req.body.cathegory]
  );
  res.json('ok!');
}

// Create Answers //
function create_answers(req, res){
  if(req.body.answers01sentence){
    db.run(
      "INSERT INTO answers (question_id, sentence, solution) VALUES (?,?,?)",
      [req.body.question_id, req.body.answers01sentence, req.body.answers01solution]
    );
    db.run(
      "INSERT INTO answers (question_id, sentence, solution) VALUES (?,?,?)",
      [req.body.question_id, req.body.answers02sentence, req.body.answers02solution]
    );
    db.run(
      "INSERT INTO answers (question_id, sentence, solution) VALUES (?,?,?)",
      [req.body.question_id, req.body.answers03sentence, req.body.answers03solution]
    );
    db.run(
      "INSERT INTO answers (question_id, sentence, solution) VALUES (?,?,?)",
      [req.body.question_id, req.body.answers04sentence, req.body.answers04solution]
    );
  }else{
    db.run(
      "INSERT INTO answers (question_id, picture_url, solution) VALUES (?,?,?)",
      [req.body.question_id, req.body.answers01picture_url, req.body.answers01solution]
    );
    db.run(
      "INSERT INTO answers (question_id, picture_url, solution) VALUES (?,?,?)",
      [req.body.question_id, req.body.picture_url, req.body.answers02solution]
    );
  }
  res.json('ok!');
}

// Delete Answer//
function drop_answer(req, res){
  db.run(
    'DELETE FROM answers WHERE question_id IN (SELECT id FROM questions WHERE quizz_id = ?)',
    [req.params.id],
  );
  res.json('ok!');
}

// Delete Question //
function drop_question(req, res){
  db.run(
    'DELETE FROM answers WHERE question_id IN (SELECT id FROM questions WHERE quizz_id = ?)',
    [req.params.id],
    function(rows,err){
      db.run(
        'DELETE FROM questions WHERE quizz_id = ?',
        [req.params.id],
      );
    }
  );
  res.json('ok!');
}

// Delete Quizz //
function drop(req, res){
    db.run('DELETE FROM answers WHERE question_id IN (SELECT id FROM questions WHERE quizz_id = ?)', [req.params.id],
    function(rows,err) {
      db.run('DELETE FROM questions WHERE quizz_id = ?', [req.params.id], function(rows,err) {
        db.run('DELETE FROM quizz WHERE id = ?', [req.params.id]);
      });
      res.json(err);
    }
  );
}

module.exports = {list,info,questions,answers,create,drop,drop_question,drop_answer,create_question,create_answers};
