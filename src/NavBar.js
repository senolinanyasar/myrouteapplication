import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/profile">Profil</Link>
                </li>
                <li>
                    <Link to="/settings">Ayarlar</Link>
                </li>
                <li>
                    <Link to="/logout">Çıkış Yap</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
