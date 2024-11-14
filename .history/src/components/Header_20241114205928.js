// Header.js
import React from 'react';
import './Header.css';

const Header = () => {
    return(
        <header className="header">
            <div className="header-logo">logo</div>
            <nav className="header-nav">
                <a href="#features">Features</a>
                <a href="#industries">Industries</a>
                <a href="#pricing">Price</a>
                <a href="#about">About Us</a>
                <a href='#contact'>Contact</a>
            </nav>
            <div className="header-buttons">
                <button className="login-button">Sing in</button>
                <button className="register-button">Sing Up</button>
            </div>
        </header>
    );
};


export default Header;