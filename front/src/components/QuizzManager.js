import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopBar from './TopBar';
import BotBar from './BotBar';
import Question from './Question';
import QuizzLauncher from './QuizzLauncher';
import Quizz from './Quizz';

export default function QuizzManager(props) {

    let [questions, setQuestions] = useState({});
    let [answers, setAnswers] = useState([]);
    let [quizzInfo, setQuizzInfo] = useState({});
    let [showQuizz, setShowQuizz] = useState(false);

    async function getQuestions() {
        setQuestions((await axios.get('http://localhost:8000/quizz/'+props.match.params.id)).data);
    }

    async function getQuizzInfo() {
        setQuizzInfo((await axios.get('http://localhost:8000/quizz_info/'+props.match.params.id)).data);
    }

    async function getAnswers() {
        setAnswers((await axios.get('http://localhost:8000/answers/'+props.match.params.id)).data);
    }

    useEffect(() => {
        getQuestions();
        getQuizzInfo();
        getAnswers();
    }, []);

    let quizzName = "Loading...";

    if(quizzInfo.length > 0) {
        quizzName = quizzInfo[0].name;
    }

    if(!showQuizz) {
        return (
            <QuizzLauncher quizzName={quizzName} quizzInfo={quizzInfo} setShowQuizz={setShowQuizz}/>
        );
    } else {
        return (
            <Quizz quizzInfo={quizzInfo} questions={questions} answers={answers}/>
        )
    }

}
