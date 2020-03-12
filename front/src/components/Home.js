import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// import './App.css';
import logo from '../logo.svg';
import TopBar from './TopBar';
import BotBar from './BotBar';
import QuizzThumbnail from './QuizzThumbnail';

export default function Home(props) {
    let [quizzes, setQuizzes] = useState([]);
    let [currentCategory, setCurrentCategory] = useState('all');

    async function getQuizzes() {
        setQuizzes((await axios.get('http://localhost:8000/quizzes')).data);
    }

    // async function addQuizz(q, images=false, video=false) {
    //     setQuizzes((await axios.post('http://localhost:8000/quizz', q)).data);
    // }

    // async function deleteQuizz(q) {
    //     setQuizzes((await axios.delete('http://localhost:8000/quizz, q')).data);
    // }

    useEffect(() => {
        getQuizzes()
    }, []);

    let jsxQuizzesThumbnails = quizzes.map(quizz =>
        <QuizzThumbnail
            key={quizz.id}
            id={quizz.id}
            name={quizz.name}
            creator_id={quizz.creator_id}
            category={quizz.category}
            creation_date={quizz.creation_date}/>
        );

    return (
        <div className="wrapper">
            <header className="top-bar home-top-bar">
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <h1>Graphizz!</h1>
                </Link>
                <Link to={'/profil'} style={{ textDecoration: 'none' }}>
                    <img className="icon profile-btn" src={process.env.PUBLIC_URL + "/img/icons/icon_user.png"} alt="user icon"/>
                </Link>
            </header>

            <div className="quizzThumbnails">
                {jsxQuizzesThumbnails}
                {jsxQuizzesThumbnails}
                {jsxQuizzesThumbnails}
                {jsxQuizzesThumbnails}
                {jsxQuizzesThumbnails}
                {jsxQuizzesThumbnails}
            </div>

            <BotBar/>
        </div>
    );
}
