import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopBar from './TopBar';
import BotBar from './BotBar';

export default function Quizz(props) {

    let [quizz, setQuizz] = useState({});
    let [question, setQuestion] = useState({});

    async function getQuizz() {
        setQuizz((await axios.get('http://localhost:8000/quiz/'+props.match.params.id)).data);
    }

    useEffect(() => {
        getQuizz()
    }, []);

    return (
        <div className="quizz-wrapper">
            <div className="quizz-header">
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
                    <span className="quizz-leader-place">#1</span>
                    <span className="quizz-leader-name">Mathieu</span>
                    <span className="quizz-leader-score">19 pts</span>
                </div>
                <div className="quizz-leader">
                    <span className="quizz-leader-place">#1</span>
                    <span className="quizz-leader-name">Mathieu</span>
                    <span className="quizz-leader-score">19 pts</span>
                </div>
            </div>

            <BotBar/>
        </div>
    );
}
