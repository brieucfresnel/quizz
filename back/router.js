const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db/quizz');

module.exports = router;
let resetDB = false; // Set this to true to reset database data

/*
* Middleware
*/

router
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
    extended: true
}));

/*
* GET requests
*/

router.get("/", (req, res) => {
   res.json("Hello world!");
});

router.get("/quizzes", (req, res) => {
    db.all( "SELECT * FROM quizz", (err, rows) => {
        res.json(rows);
    });
});

router.get('/quiz/:id', (req, res) => {
    db.get(
        "SELECT * FROM quizz WHERE id=?",
        req.params.id,
        (err, row) => {
            res.json(row)
        }
    );
});

/*
* POST, UPDATE, DELETE requests
*/

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

router.post('/quizz',(req, res) => {
    db.run("INSERT INTO quizz (creator_id, name, picture_url, category, difficulty, creation_date) VALUES(?,?,?,?,?,?)", [req.body.creator_id, req.body.name, req.body.picture_url, req.body.category, rel.body.difficulty, rel.body.creation_date]);
    res.redirect(303, '/quizzes');
});

router.delete('/quizzes/:id', (req, res) => {
    db.run('DELETE FROM person WHERE id=?', [req.params.id]);
    res.redirect(303, "/quizz");
});

/*
* 400 Errors handling
*/

router.use((req, res) => {
    res.status(400);
    res.json({
       error: "Bad request"
    });
});
