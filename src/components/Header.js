// Header.js
import React from 'react';
import './Header.css';

const Header = () => {
    return(
        <header className="header">
            <div className="header-logo">/logo url</div>
            <nav className="header-nav">
                <a href="#features">Özellikler</a>
                <a href="#industries">Sektörler</a>
                <a href="#pricing">Fiyatlandırma</a>
                <a href="#about">Hakkımızda</a>
            </nav>
            <div className="header-buttons">
                <button className="login-button">Giriş</button>
                <button className="register-button">Kayıt Ol</button>
            </div>
        </header>
    );
};


export default Header;