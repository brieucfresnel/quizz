import React from 'react';
import {Link} from 'react-router-dom';

export default function TopBar() {
    return (
        <header className="top-bar">
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <h1>Graphizz!</h1>
            </Link>
            <Link to={'/profil'} style={{ textDecoration: 'none' }}>
                <img className="icon profile-btn" src={process.env.PUBLIC_URL + "/img/icons/icon_user.png"} alt="user icon"/>
            </Link>
        </header>
    );
}
