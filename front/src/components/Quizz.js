import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopBar from './TopBar';
import BotBar from './BotBar';
import Question from './Question';
import QuizzLauncher from './QuizzLauncher';

export default function Quizz(props) {
    let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    let [selectedAnswer, setSelectedAnswer] = useState(false);

    let currentQuestion = props.questions[currentQuestionIndex];
    let questionsCount = props.questions.length;

    function nextQuestion() {
        setCurrentQuestionIndex(currentQuestionIndex+1);
    }

    function selectAnswer(e) {
        setSelectedAnswer(e.target.id);
        let answers = document.querySelectorAll('.quizz-answers li');
        answers.forEach((answer) => {
            answer.className = null;
        })
        e.target.className="selected";
    }

    return (
        <div className="quizz-wrapper launched">
            <TopBar/>

            <div className="quizz">
                <Question questions={props.questions} key={currentQuestion.id} id={currentQuestion.id} selectAnswer={selectAnswer} count={questionsCount} index={currentQuestionIndex} sentence={currentQuestion.sentence} number={currentQuestion.number} answers={currentQuestion.answers}/>
            </div>

            <div className="bot-bar">
                <div className="control-btn" onClick={nextQuestion}>
                    SUIVANT
                </div>
            </div>
        </div>
    );
}
