import React, {useState} from 'react';
import TopBar from './TopBar';

export default function NewQuizzForm(props) {

    let [currPageTitle, setCurrPageTitle] = useState('quizzInfo');
    let pageToShow = '';

    switch(currPageTitle) {
        case 'quizzInfo':
            return (
                <div className="newQuizzForm">
                    <TopBar />
                    <h1>Créez votre propre quizz</h1>
                    <form className="quizzInfoForm">
                        <input type="text" name="quizzName" placeholder="Nom du quizz" required/>
                        <input type="file" name="quizzImage" required/>
                        <select name="quizzCategory" required>
                            <option value="webdesign">Web Design</option>
                            <option value="webdesign">Motion Design</option>
                            <option value="webdesign">Game Design</option>
                            <option value="webdesign">Print</option>
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
                            <div className="questionType-block">
                                <div>Question textuelle</div>
                                <img src={process.env.PUBLIC_URL + "/img/icons/icon_text.png"}/>
                            </div>
                            <div className="questionType-block">
                                <div>Question textuelle</div>
                                <img src={process.env.PUBLIC_URL + "/img/icons/icon_play_2.png"}/>
                            </div>
                        </div>
                    </div>
                    <div className="bot-bar">
                        <div className="control-btn" onClick={(e) => setCurrPageTitle('textQuestion')}>
                            SUIVANT
                        </div>
                    </div>
                </div>
            );
            break;
        case 'textQuestion':
            // input question, choose answer type
            return (
                <div className="newQuizzForm">
                    <h1>Question 1</h1>
                    textQuestion
                </div>
            );
            break;
        case 'textQuestion_textAnswers':
            // show question, fill answers, choose rightAnswer
            return (
                <div className="newQuizzForm">
                    <h1>Question 1</h1>
                </div>
            );
            break;
        case 'textQuestion_imgAnswers':
            // show question, upload images, choose rightAnswer
            return (
                <div className="newQuizzForm">
                    <h1>Question 1</h1>
                </div>
            );
            break;
        case 'videoQuestion':
            // upload video, fill questions, choose rightAnswer
            return (
                <div className="newQuizzForm">

                </div>
            );
            break;
    }
}
