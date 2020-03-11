import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopBar from './TopBar';
import BotBar from './BotBar';
import Question from './Question';
import QuizzLauncher from './QuizzLauncher';
import Quizz from './Quizz';

export default function QuizzManager(props) {

    let [questions, setQuestions] = useState({});
    let [quizzInfo, setQuizzInfo] = useState({});
    let [showQuizz, setShowQuizz] = useState(false);

    async function getQuestions() {
        setQuestions((await axios.get('http://localhost:8000/quizz/'+props.match.params.id)).data);
    }

    async function getQuizzInfo() {
        setQuizzInfo((await axios.get('http://localhost:8000/quizz_info/'+props.match.params.id)).data);
    }

    useEffect(() => {
        getQuestions();
        getQuizzInfo();
    }, []);

    if(!showQuizz) {
        console.log(quizzInfo);
        return (
            <QuizzLauncher setShowQuizz={setShowQuizz} quizzInfo={quizzInfo}/>
        );
    } else {
        return (
            <Quizz questions={questions} />
        )
    }


}
