import React from 'react';
import {Link} from 'react-router-dom';

export default function BotBar() {
    return (
        <div className="bot-bar">
            <Link to={'/new_quizz'} style={{ textDecoration: 'none' }}>
                <div className="control-btn">
                    <img className="control-btn-icon" src={process.env.PUBLIC_URL + "/img/icons/icon_add.png"} alt="add quizz icon"/>
                </div>
            </Link>
            <div className="control-btn">
                <img className="control-btn-icon" src={process.env.PUBLIC_URL + "/img/icons/icon_search.png"} alt="search icon"/>
            </div>
        </div>
    );
}
