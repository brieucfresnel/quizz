
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/quizz');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////// Scores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// All scores //
function all(req, res) {
  db.all( "SELECT * FROM scores", (err, rows) => {
    res.json(rows);
  });
}

// Scores of a particular quizz //
function quizz(req, res) {
  db.all( "SELECT * FROM scores WHERE quizz_id = ?", [req.params.id], (err, rows) => {
    res.json(rows);
  });
}

// Best scores of a particular quizz //
function quizzLeaderboard(req, res) {
    db.all( "SELECT score, login FROM scores LEFT JOIN users ON scores.user_id = users.id WHERE quizz_id = ? ORDER BY score DESC LIMIT 3", [req.params.id], (err, rows) => {
      res.json(rows);
    });
}

// Scores of a particular user //
function user(req, res) {
  db.all( "SELECT * FROM scores WHERE user_id = ?", [req.params.id], (err, rows) => {
    res.json(rows);
  });
}

// Score of a particular user for a giver quizz//
function userQuizz(req, res) {
    db.get( "SELECT * FROM scores WHERE user_id = ? AND quizz_id = ? ", [req.params.user_id, req.params.quizz_id], (err, rows) => {
      res.json(rows);
    });
}

// Add Score //
function add(req, res) {
  db.run( "INSERT INTO score (users_id, quizz_id, score) VALUES (?, ?, ?)", [req.params.user_id, req.params.quizz_id, req.params.score], (err, rows) => {
    res.json(rows);
  });
}

module.exports = {all,quizz,quizzLeaderboard,user,userQuizz};
