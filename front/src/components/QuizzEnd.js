import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import TopBar from './TopBar';
import BotBar from './BotBar';

export default function QuizzEnd(props) {
    return (
        <div className="quizz-end-wrapper">
            <div className="quizz-header">
                <div>
                    <img className="quizz-header-img" src={process.env.PUBLIC_URL + "/img/quizzes/1.png"} alt=""/>
                </div>
                <TopBar/>

                <div className="quizz-end-header-content">
                    <div className="quizz-end-score">
                        Votre score:
                        <div>18 pts</div>
                    </div>

                    <div className="quizz-end-header-btns">
                        <Link to={'/quizz/'+props.quizzID} style={{ textDecoration: 'none' }}>
                            <div className="quizz-end-header-btn">
                                <img className="quizz-end-header-btn-icon" src={process.env.PUBLIC_URL + "/img/icons/icon_refresh.png"} alt=""/>
                            </div>
                        </Link>
                        <Link to={'/'} style={{ textDecoration: 'none' }}>
                            <div className="quizz-end-header-btn">
                                <img className="quizz-end-header-btn-icon" src={process.env.PUBLIC_URL + "/img/icons/icon_home.png"} alt=""/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="quizz-info">
                <h1 className="quizz-name">{props.quizzName}</h1>
                <div className="quizz-author">Créé par OIEZQHFDVSHZ</div>
            </div>

            <div className="quizz-end-rate">
                Donnez une note à ce quizz
            </div>

            <BotBar/>
        </div>
    );
}
