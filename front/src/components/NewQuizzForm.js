import React, {useState} from 'react';

export default function NewQuizzForm(props) {

    let [currPageTitle, setCurrPageTitle] = useState('quizzInfo');
    let [questions, setQuestions] = useState([]);
    let [answers, setAnswers] = useState([]);
    let pageToShow = '';

    switch(currPageTitle) {
        case 'quizzInfo':
            return (
                <div className="newQuizzForm">
                    <h1>Créez votre propre quizz</h1>
                    <form className="quizzInfoForm">
                        <input type="text" name="quizzName" required/>
                        <input type="file" name="quizzImage" required/>
                        <select name="quizzCategory" required>
                            <option value="webdesign">Web Design</option>
                            <option value="webdesign">Motion Design</option>
                            <option value="webdesign">Game Design</option>
                            <option value="webdesign">Print</option>
                        </select>
                    </form>
                    <div className="bot-bar">
                        <div className="control-btn">
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
                    <h1>Quel type de questions souhaitez-vous ajouter ?</h1>
                </div>
            );
            break;
        case 'textQuestion':
            // input question, choose answer type
            return (
                <div className="newQuizzForm">
                    <div className="questionSlot">Votre question: currentQuestion</div>
                    <h1>Quel type de réponses souhaitez-vous ajouter ?</h1>
                    <div className="">
                    </div>
                </div>
            );
            break;
        case 'textQuestion_textAnswers':
            // show question, fill answers, choose rightAnswer
            return (
                <div className="newQuizzForm">
                    <h1></h1>
                </div>
            );
            break;
        case 'textQuestion_imgAnswers':
            // show question, upload images, choose rightAnswer
            return (
                <div className="newQuizzForm">

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
