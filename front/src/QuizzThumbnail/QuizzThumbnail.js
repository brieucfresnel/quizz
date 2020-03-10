import React from 'react';

export default function QuizzThumbnail(props) {

    function openQuizz() {
        
    }

    return (
        <div onClick={openQuizz} className="quizzThumbnail-border">
            <div className="quizzThumbnail">
                <div className="quizzThumbnail-name">{props.name}</div>
                <div className="quizzThumbnail-rating">
                    <div className="rating-elt active"></div>
                    <div className="rating-elt active"></div>
                    <div className="rating-elt active"></div>
                    <div className="rating-elt"></div>
                    <div className="rating-elt"></div>
                </div>
                <div className="quizzThumbnail-creator">
                    Auteur: {props.creator_id}
                </div>
            </div>
        </div>
    );
}
