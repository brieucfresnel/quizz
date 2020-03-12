import React, {useState} from 'react';
import TopBar from './TopBar';

export default function NewQuizzForm(props) {

    let [currPageTitle, setCurrPageTitle] = useState('quizzInfo');
    let [quizzName, quizzImage, quizzCategory, questionType, answersType] = '';
    let currQuestionIndex = 0;
    let textAnswers = [];
    let imgAnswers = {}
    let pageToShow = '';

    function setQuestionType() {
        setCurrPageTitle('textQuestion')
    }

    function sendQuizz() {
        // Need to check which answer is true then put all data in object and post it 
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
                            <option value="webdesign" >Web Design</option>
                            <option value="motiondesign">Motion Design</option>
                            <option value="gamedesign">Game Design</option>
                            <option value="print">Print</option>
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
            console.log(textAnswers);
            return (
                <div className="newQuizzForm">
                    <h1>Question {currQuestionIndex+1}</h1>
                    <div className="newQuizzForm-question">
                        {}
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
                    <div className="bot-bar">
                        <div className="control-btn" onClick={(e) => sendQuizz()}>
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
