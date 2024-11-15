// Header.js
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">logo</div>
            <nav className="header-nav">
               
                    <Link to="/">Home</Link>
                    <Link to="/features">Features</Link>
                    <Link to="/industries">Industries</Link>
                    <Link to="/pricing">Price</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/contact">Contact</Link>
                    
               

            </nav>
            <div className="header-buttons">
                <button className="login-button">Sing in</button>
                <button className="register-button">Sing Up</button>
            </div>
        </header>
    );
};


export default Header;