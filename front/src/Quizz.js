import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopBar from './TopBar';
import BotBar from './BotBar';

export default function Quizz(props) {

    let [quizz, setQuizz] = useState({});
    let [showQuizz, setShowQuizz] = useState(false);
    let [currentQuestion, setCurrentQuestion] = useState({});
    let [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    let [questionsCount, setQuestionsCount] = useState(0);
    let [selectedAnswer, setSelectedAnswer] = useState(false);

    function selectAnswer(e) {
        setSelectedAnswer(e.target.id);
        let answers = document.querySelectorAll('.quizz-answers li');
        answers.forEach((answer) => {
            answer.className = null;
        })
        e.target.className="selected";
    }

    function nextQuestion() {
        setCurrentQuestionIndex(currentQuestionIndex+1);
        setCurrentQuestion(questions[currentQuestionIndex]);
    }

    async function getQuizz() {
        setQuizz((await axios.get('http://localhost:8000/quiz/'+props.match.params.id)).data);
    }

    useEffect(() => {
        getQuizz()
    }, []);

    if(!showQuizz) {
        return (
            <div className="quizz-wrapper">
                <div className="quizz-header" onClick={(e) => setShowQuizz(true)}>
                    <img className="quizz-header-img" src={process.env.PUBLIC_URL + "/img/quizzes/1.png"} alt=""/>

                    <TopBar/>

                    <div className="quizz-header-content">
                        <img className="icon" src={process.env.PUBLIC_URL + "/img/icons/icon_play.png"} alt="play button"/>

                        <div className="quizz-header-bottom">
                            <div className="quizz-score">18 pts</div>
                            <div className="quizz-rating">
                                <div className="rating-elt active"></div>
                                <div className="rating-elt active"></div>
                                <div className="rating-elt active"></div>
                                <div className="rating-elt"></div>
                                <div className="rating-elt"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="quizz-info">
                    <h1 className="quizz-name">{quizz.name}</h1>
                    <div className="quizz-author">Créé par {quizz.creator_id}</div>
                </div>

                <div className="quizz-leaderboard">
                    <div className="quizz-leader">
                        <span className="quizz-leader-place">#1</span>
                        <span className="quizz-leader-name">Mathieu</span>
                        <span className="quizz-leader-score">19 pts</span>
                    </div>
                    <div className="quizz-leader">
                        <span className="quizz-leader-place">#2</span>
                        <span className="quizz-leader-name">Ishita</span>
                        <span className="quizz-leader-score">16 pts</span>
                    </div>
                    <div className="quizz-leader">
                        <span className="quizz-leader-place">#3</span>
                        <span className="quizz-leader-name">Georgios</span>
                        <span className="quizz-leader-score">15 pts</span>
                    </div>
                </div>

                <BotBar/>
            </div>
        );
    } else {
        return (
            <div className="quizz-wrapper launched">
                <TopBar/>
                <div className="quizz">
                    <div className="quizz-question-number">Question <span>1/6</span></div>
                    <h1 className="quizz-question">Quel nom générique donne-t-on à la nourriture accrochée à un hameçon ?</h1>
                    <ul className="quizz-answers">
                        <li id="answer_1" onClick={(e) => selectAnswer(e)}>Réponse A</li>
                        <li id="answer_2" onClick={(e) => selectAnswer(e)}>Réponse B</li>
                        <li id="answer_3" onClick={(e) => selectAnswer(e)}>Réponse C</li>
                        <li id="answer_4" onClick={(e) => selectAnswer(e)}>Réponse D</li>
                    </ul>
                </div>

                <div className="bot-bar">
                    <div className="control-btn" onClick={nextQuestion}>
                        SUIVANT
                    </div>
                </div>
            </div>
        )
    }


}
