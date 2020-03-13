import React, {useState} from 'react';
import TopBar from './TopBar';
import axios from 'axios';

export default function NewQuizzForm(props) {

    let [currPageTitle, setCurrPageTitle] = useState('quizzInfo');
    let [quizzName, quizzImage, quizzCategory, questionType, answersType] = '';

    let [quizz, setQuizz] = useState({'id': 1});
    let [currQuestion, setCurrQuestion] = useState({});

    let currQuestionIndex = 0;
    let textAnswers = [];
    let imgAnswers = {}
    let pageToShow = '';
    let count = 0;

    function setQuestionType() {
        setCurrPageTitle('textQuestion');
    }

    async function sendAll() {
        let quizzToSend = {
            'creator_id': 1,
            'name': quizzName,
            'picture_url': '/quizz/webdesign.jpg',
            'category': quizzCategory,
            'difficulty': 1
        }

        let quizzID = sendQuizz(quizzToSend);
        let questionID = sendQuestion(quizzID);
        sendAnswers(questionID);
    }

    async function sendQuestion(quizzID) {
        let questionToSend = {
            'quizz_id': quizzID,
            'sentence': currQuestion.sentence,
            'video_url': '',
            'score': 0,
            'category': quizzCategory
        }

        (await axios.post('http://localhost:8000/question', questionToSend)).then(function(response) {
            setCurrQuestion(response);
            console.log(response);
            return currQuestion;
        });
    }

    async function sendAnswers(questionID) {
        let answersToSend = {

            'question_id': questionID,

            'answersO1sentence': textAnswers[0],
            'answers01solution': 0,

            'answers02sentence': textAnswers[1],
            'answers02solution': 0,

            'answers03sentence': textAnswers[2],
            'answers03solution': 0,

            'answers04sentence': textAnswers[3],
            'answers04solution': 0,
        }
    }

    function choosePage() {
        if(count < 2) {
            setCurrPageTitle('questionType');
        } else {
            sendQuizz();
        }
    }

    async function sendQuizz(quizzToSend) {
        // Need to check which answer is true then put all data in object and post it


        (await axios.post('http://localhost:8000/quizz', quizzToSend).then(function(response) {
            setQuizz(response);
            return quizz.quizzID;
            console.log(quizz.quizzID);
        }));
    }

    switch(currPageTitle) {

        // QUIZZ INFO INPUTS

        case 'quizzInfo':
            return (
                <div className="newQuizzForm">
                    <TopBar />
                    <h1>Créez votre propre quizz</h1>
                    <form className="quizzInfoForm">
                        <input onChange={(e) => quizzName = e.target.value} type="text" name="quizzName" placeholder="Nom du quizz" required/>
                        <input type="file" name="quizzImage" required/>
                        <select onChange={(e) => quizzCategory = e.target.value} name="quizzCategory" required>
                            <option value="">Catégorie</option>
                            <option value="Web Design" >Web Design</option>
                            <option value="Motion Design">Motion Design</option>
                            <option value="Game Design">Game Design</option>
                            <option value="Print">Print</option>
                        </select>
                    </form>
                    <div className="bot-bar">
                        <div className="control-btn" onClick={(e) => setCurrPageTitle('questionType')}>
                            SUIVANT
                        </div>
                    </div>
                </div>
            );
            break;

        // CHOOSE QUESTION TYPE

        case 'questionType':
            // show questions if there are any + delete btn
            // choose question type: video or text
            return (
                <div className="newQuizzForm">
                <TopBar />
                    <h1>Vos questions</h1>
                    <div className="choose-questionType">
                        <div>Quel type de question souhaitez-vous ajouter ?</div>
                        <div className="questionType-blocks">
                            <div className="questionType-block" onClick={(e) => setCurrPageTitle('textQuestion')}>
                                <div>Question textuelle</div>
                                <img src={process.env.PUBLIC_URL + "/img/icons/icon_text.png"}/>
                            </div>
                            <div className="questionType-block">
                                <div>Question textuelle</div>
                                <img src={process.env.PUBLIC_URL + "/img/icons/icon_play_2.png"}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
            break;

        // TEXT QUESTION INPUT

        case 'textQuestion':
            // input question, choose answer type
            count++;
            return (
                <div className="newQuizzForm">
                    <TopBar />
                    <h1>Question {currQuestionIndex+1}</h1>
                    <div className="newQuizzForm-question">

                    </div>
                    <div className="newQuizzForm-info">Saissez les réponses et cochez celle qui est vraie</div>
                    <div className="newQuizzForm-answers">
                        <div className="newQuizzForm-answer-container">
                            <input onChange={(e) => textAnswers[0] = e.target.value} className="newQuizzForm-answer" type="text" name="answer_1" placeholder="Réponse A" required/>
                            <input type="checkbox" name="answer_1_checkbox"/>
                        </div>
                        <div className="newQuizzForm-answer-container">
                            <input onChange={(e) => textAnswers[1] = e.target.value} className="newQuizzForm-answer" type="text" name="answer_1" placeholder="Réponse A" required/>
                            <input type="checkbox" name="answer_1_checkbox"/>
                        </div>
                        <div className="newQuizzForm-answer-container">
                            <input onChange={(e) => textAnswers[2] = e.target.value} className="newQuizzForm-answer" type="text" name="answer_1" placeholder="Réponse A" required/>
                            <input type="checkbox" name="answer_1_checkbox"/>
                        </div>
                        <div className="newQuizzForm-answer-container">
                            <input onChange={(e) => textAnswers[3] = e.target.value} className="newQuizzForm-answer" type="text" name="answer_1" placeholder="Réponse A" required/>
                            <input type="checkbox" name="answer_1_checkbox"/>
                        </div>
                    </div>

                    <button className="addQuestion-btn" onClick={(e) => setCurrPageTitle('questionType')}>Add another question</button>
                    <div className="bot-bar">
                        <div className="control-btn" onClick={choosePage}>
                            VALIDER
                        </div>
                    </div>
                </div>
            );
            break;

        case 'textQuestion_textAnswers':
            // show question, fill answers, choose rightAnswer
            return (
                <div className="newQuizzForm">
                    <h1>Question {currQuestionIndex+1}</h1>
                </div>
            );
            break;

        case 'textQuestion_imgAnswers':
            // show question, upload images, choose rightAnswer
            break;
    }
}
