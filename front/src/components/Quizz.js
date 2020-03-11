import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopBar from './TopBar';
import BotBar from './BotBar';
import Question from './Question';
import QuizzLauncher from './QuizzLauncher';

export default function Quizz(props) {
    let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    let [selectedAnswer, setSelectedAnswer] = useState(false);
    let [answers, setAnswers] = useState([]);
    let isQuizzFinished = false;

    let currentQuestion = {};

    let questionsCount = 0;
    let questions = {};

    if(props.questions!==undefined) {
        questions = props.questions;
        currentQuestion = props.questions[currentQuestionIndex];
        questionsCount = props.questions.length;
    }


    function nextQuestion() {
        setCurrentQuestionIndex(currentQuestionIndex+1);

        if (currentQuestionIndex <= questionsCount) {
            let tmp = answers;
            tmp.push(selectedAnswer);
            setAnswers(tmp);
            console.log(answers);
        }
    }

    function selectAnswer(e) {
        setSelectedAnswer(e.target.id);
        let answers = document.querySelectorAll('.quizz-answers li');
        answers.forEach((answer) => {
            answer.className = null;
        })
        e.target.className="selected";
    }

    if(currentQuestionIndex == questionsCount) {
        isQuizzFinished = true;
    }

    if(isQuizzFinished) {
        return (
            <div>
                Quizz is finished  !<br/>
                Chosen answers: {answers}
            </div>
        );
    } else {
        return (
            <div className="quizz-wrapper launched">
                <TopBar/>

                <div className="quizz">
                    <Question questions={questions} key={currentQuestion.id} id={currentQuestion.id} selectAnswer={selectAnswer} count={questionsCount} index={currentQuestionIndex} sentence={currentQuestion.sentence} number={currentQuestion.number} answers={currentQuestion.answers}/>
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
