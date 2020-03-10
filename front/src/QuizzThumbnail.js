import React from 'react';
import {Link} from 'react-router-dom';

export default function QuizzThumbnail(props) {

    return (
        <Link to={'/quizz/'+props.id} style={{ textDecoration: 'none' }}>
            <div className="quizzThumbnail-border">
                <div className="quizzThumbnail">
                    <div className="quizzThumbnail-name">{props.name}</div>
                    <div className="quizz-rating">
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
        </Link>
    );
}
