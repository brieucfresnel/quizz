
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
  db.all( "SELECT * FROM quizz", (err, rows) => {
    res.json(rows);
  });
}

// Particular Quizz Informations //
function info(req, res){
  db.all('SELECT * FROM quizz LEFT JOIN scores ON scores.quizz_id = quizz.id WHERE quizz.id=?', [req.params.id] , (err, rows) => {
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
  if ( req.body.name ){
    db.run(
      "INSERT INTO quizz (creator_id, name, picture_url, category, difficulty, creation_date) VALUES (?,?,?,?,?,?)",
      [req.body.creator_id, req.body.name, req.body.picture_url, req.body.category, req.body.difficulty, req.body.creation_date],
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

// Delete Quizz //
function drop(req, res){
    db.run('DELETE FROM answers WHERE question_id IN (SELECT id FROM questions WHERE quizz_id = ?)', [req.params.id],
    function(rows,err) {
      db.run('DELETE FROM questions WHERE quizz_id = ?', [req.params.id], function(rows,err) {
        db.run('DELETE FROM quizz WHERE id = ?', [req.params.id]);
      })
      res.json(err);
    }
  );
}

module.exports = {list,info,questions,answers,create,drop};
