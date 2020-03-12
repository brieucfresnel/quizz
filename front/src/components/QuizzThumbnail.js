import React from 'react';
import {Link} from 'react-router-dom';
import {HTTP_SERVER_PORT_PICTURES} from '../constants.js';

export default function QuizzThumbnail(props) {
    let bgImage = HTTP_SERVER_PORT_PICTURES + props.picture_url;
    console.log('picture_url: ' + props.picture_url);
    return (
        <Link to={'/quizz/'+props.id} style={{ textDecoration: 'none' }}>
            <div className="quizzThumbnail-border">
                <div className="quizzThumbnail" style={{backgroundImage: 'url('+bgImage+')'}}>
                    <div className="quizzThumbnail-overlay"></div>
                    <div className="quizzThumbnail-content">
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
            </div>
        </Link>
    );
}
