import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopBar from './TopBar';
import BotBar from './BotBar';
import Question from './Question';
import QuizzLauncher from './QuizzLauncher';
import QuizzEnd from './QuizzEnd';

export default function Quizz(props) {
    let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    let [selectedAnswer, setSelectedAnswer] = useState(false);
    let [userAnswers, setUserAnswers] = useState([]);

    let isQuizzFinished = false;
    let currentQuestion = {};
    let currentQuestionAnswers = [];
    let questionsCount = 0;
    let questions = {};
    let rightAnswers = [];
    let successfullAnswers = [];

    if(props.questions!==undefined) {
        questions = props.questions;
        currentQuestion = props.questions[currentQuestionIndex];

        if(currentQuestion !== undefined)
            currentQuestionAnswers = props.answers.filter(answer => answer.question_id==currentQuestion.id);

        questionsCount = props.questions.length;
    }

    function nextQuestion() {
        setCurrentQuestionIndex(currentQuestionIndex+1);
        currentQuestionAnswers = props.answers.filter(answer => answer.question_id==currentQuestion.id);

        if (currentQuestionIndex <= questionsCount) {
            let tmp = userAnswers;
            tmp.push(selectedAnswer);
            setUserAnswers(tmp);
        }
    }

    function selectAnswer(e) {
        setSelectedAnswer(e.target.id);
        let domAnswers = document.querySelectorAll('.quizz-answers li');
        domAnswers.forEach((domAnswers) => {
            domAnswers.className = null;
        })
        e.target.className="selected";
    }

    function checkAnswers() {
        rightAnswers = props.answers.filter(answer => answer.solution == 1);
        for (let i = 0 ; i < rightAnswers.length ; i++) { // check matches with user answers

        }

        // calculate score
    }

    function restartQuizz() {
        // store score, empty answers tab, reset index
    }

    if(currentQuestionIndex == questionsCount) {
        isQuizzFinished = true;
        checkAnswers();
    }

    if(isQuizzFinished) {
        return (
            <QuizzEnd quizzID={props.quizzInfo[0].quizz_id} quizzName={props.quizzInfo[0].name} />
        );
    } else {
        return (
            <div className="quizz-wrapper launched">
                <TopBar/>

                <div className="quizz">
                    <Question answers={currentQuestionAnswers} key={currentQuestion.id} id={currentQuestion.id} selectAnswer={selectAnswer} count={questionsCount} index={currentQuestionIndex} sentence={currentQuestion.sentence} number={currentQuestion.number}/>
                </div>

                <div className="bot-bar">
                    <div className="control-btn" onClick={nextQuestion}>
                        SUIVANT
                    </div>
                </div>
            </div>
        );
    }
}
