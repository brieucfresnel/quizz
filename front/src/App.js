import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import Quizz from './Quizz/Quizz';
import QuizzThumbnail from './QuizzThumbnail/QuizzThumbnail';

function App() {
    let [quizzes, setQuizzes] = useState([]);
    let [quizzesThumbnails, setQuizzesThumbnails] = useState({});
    let [currentCategory, setCurrentCategory] = useState('all');

    async function getQuizzes() {
        setQuizzes((await axios.get('http://localhost:8000/quizzes')).data);
    }

    async function addQuizz(q, images=false, video=false) {
        if(images) {
            // Handle image answers
        }

        if(video) {
            // Handle video question
        }

        setQuizzes((await axios.post('http://localhost:8000/quizz', q)).data);
        // Redirect to home
    }

    async function deleteQuizz(q) {
        setQuizzes((await axios.delete('http://localhost:8000/quizz, q')).data);
    }

    let jsxQuizzes = {};
    if(quizzesThumbnails.length != 0) {
        if(!currentCategory !== 'all') {

            // jsxQuizzes = quizzesThumbnails
            //     .filter(quizzThumbnail => quizzThumbnail.category == currentCategory)
            //     .map(quizzThumbnail =>
            //         <QuizzThumbnail name={quizzThumbnail.name} questions={quizzThumbnail.questions}/>
            //     );
        } else {

        }

    }

    useEffect(() => {
        getQuizzes()
    }, []);

    jsxQuizzes = quizzes.map(quizz =>
        <QuizzThumbnail
            key={quizz.id}
            name={quizz.name}
            creator_id={quizz.creator_id}
            category={quizz.category}
            creation_date={quizz.creation_date}/>
        );

    return (
    <div className="wrapper">
        <header className="top-bar">
            <h1>Graphizz!</h1>
            <img className="icon profile-btn" src={process.env.PUBLIC_URL + "/img/icons/icon_user.png"}/>
        </header>
        <main className="quizzThumbnails">
            {jsxQuizzes}
            {jsxQuizzes}
            {jsxQuizzes}
        </main>

        <div className="bot-bar">
            <div className="control-btn">
                <img className="control-btn-icon" src={process.env.PUBLIC_URL + "/img/icons/icon_add.png"}/>
            </div>
            <div className="control-btn">
                <img className="control-btn-icon" src={process.env.PUBLIC_URL + "/img/icons/icon_search.png"}/>
            </div>
        </div>
    </div>

    );
}

export default App;
