const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const quizz = require('./db_function/quizz.js');
console.log(quizz);
const db = new sqlite3.Database('./db/quizz');

module.exports = router;

/*
* Middleware
*/

router
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
    extended: true
}));

router.get("/", (req, res) => {
  res.json("Hello world!");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////// Quizz /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Quizz List //
router.get("/quizzes", (req, res) => {
  quizz.list(req, res);
});

// Particular Quizz Informations //
router.get('/quizz_info/:id', (req, res) => {
  quizz.info(req, res);
});

// Quizz Questions //
router.get('/quizz/:id', (req, res) => {
  quizz.questions(req, res);
});

// Quizz Answers //
router.get('answers/:id', (req, res) => {
  quizz.answers(req, res);
});

// Create Quizz //
router.post('/quizz',(req, res) => {
  quizz.create(req, res);
});

// Create question //
router.post('/question',(req, res) => {
    quizz.create_question(req, res);
});

// Create answers //
router.post('/answers',(req, res) => {
    quizz.create_answers(req, res);
});

// Delete Quizz //
router.delete('/quizz/:id', (req, res) => {
    quizz.drop(req, res);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////// Scores /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.get('/scores', (req, res) => { ////////////////////////////// All scores //////////////////////////////
//   db.get(
//     "SELECT * FROM scores",
//     (err, row) => {
//       res.json(row)
//     }
//   );
// });
//
// router.get('/scores/:id', (req, res) => { ////////////////////////////// Scores of a particular quizz //////////////////////////////
//   db.get(
//     "SELECT * FROM scores WHERE quizz_id=?",
//     req.params.id,
//     (err, row) => {
//       res.json(row)
//     }
//   );
// });
//
// router.post('/score', (req, res) => { ////////////////////////////// Add Score //////////////////////////////
//   db.run("INSERT INTO scores (user_id,quizz_id,score) VALUES(?,?,?)", [req.body.quizz_id, req.body.user_id, req.body.score]);
//   res.send('Score Added');
// });
//
//
//
// router.delete('/quizz/:id', (req, res) => {
//     db.run('DELETE FROM person WHERE id=?', [req.params.id]);
//     res.redirect(303, "/");
// });

router.post('/upload', (req, res) => {
    if (!req.files)
        return res.status(500).send({ msg: "file is not found" })

    // accessing the file
    const myFile = req.files.file;

    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/data/img/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        console.log(myFile.name);
        return res.send({name: myFile.name});
    });
})



/*
* 400 Errors handling
*/

router.use((req, res) => {
    res.status(400);
    res.json({
       error: "Bad request"
    });
});
