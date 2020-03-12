import React from 'react';
import {HTTP_SERVER_PORT_PICTURES} from '../constants.js';

export default function Question(props) {
  console.log(props.answers[0]);
  if (props.answers[0].sentence != null) {
    let jsxAnswers = props.answers.map((answer) =><li key={answer.id} id={answer.id} onClick={(e) => props.selectAnswer(e)}>{answer.sentence}</li>);
    return (
        <div className="quizz-question">
            <div className="quizz-question-number">Question <span>{props.index+1}/{props.count}</span></div>
            <h1 className="quizz-question-sentence">{props.sentence}</h1>
            <ul className="quizz-answers">
                {jsxAnswers}
            </ul>
        </div>
    );
  }else{
    let jsxAnswers = props.answers.map((answer) =><li key={answer.id} id={answer.id} onClick={(e) => props.selectAnswer(e)} ><img src={HTTP_SERVER_PORT_PICTURES + answer.picture_url} /><br/><br/>Cliquer ici pour selectionner</li>);
    return (
        <div className="quizz-question">
            <div className="quizz-question-number">Question <span>{props.index+1}/{props.count}</span></div>
            <h1 className="quizz-question-sentence">{props.sentence}</h1>
            <ul className="quizz-answers">
                {jsxAnswers}
            </ul>
        </div>
    );
  }
}
