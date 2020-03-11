import React from 'react';

export default function BotBar() {
    return (
        <div className="bot-bar">
            <div className="control-btn">
                <img className="control-btn-icon" src={process.env.PUBLIC_URL + "/img/icons/icon_add.png"} alt="add quizz icon"/>
            </div>
            <div className="control-btn">
                <img className="control-btn-icon" src={process.env.PUBLIC_URL + "/img/icons/icon_search.png"} alt="search icon"/>
            </div>
        </div>
    );
}
