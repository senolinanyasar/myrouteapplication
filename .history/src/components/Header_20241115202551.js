// Header.js
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">logo</div>
            <nav className="header-nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/pricing">Price</Link></li>
                    <a href="#features">Features</a>
                    <a href="#industries">Industries</a>
                    <a href="./PricingPage.js">Price</a>
                    <a href="#about">About Us</a>
                    <a href='#contact'>Contact</a>
                </ul>

            </nav>
            <div className="header-buttons">
                <button className="login-button">Sing in</button>
                <button className="register-button">Sing Up</button>
            </div>
        </header>
    );
};


export default Header;