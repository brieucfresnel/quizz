import React from 'react';

export default function Question(props) {
    let jsxAnswers = props.answers.map((answer) => <li key={answer.id} id={answer.id} onClick={(e) => props.selectAnswer(e)}>{answer.sentence}</li>)
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
