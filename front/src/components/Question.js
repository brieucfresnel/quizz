import React from 'react';

export default function Question(props) {
    return(
        <div className="quizz-question">
            <div className="quizz-question-number">Question <span>{props.index}/{props.count}</span></div>
            <h1 className="quizz-question-sentence">{props.sentence}</h1>
            <ul className="quizz-answers">
                <li id="answer_1" onClick={(e) => props.selectAnswer(e)}>Réponse A</li>
                <li id="answer_2" onClick={(e) => props.selectAnswer(e)}>Réponse B</li>
                <li id="answer_3" onClick={(e) => props.selectAnswer(e)}>Réponse C</li>
                <li id="answer_4" onClick={(e) => props.selectAnswer(e)}>Réponse D</li>
            </ul>
        </div>
    );
}
