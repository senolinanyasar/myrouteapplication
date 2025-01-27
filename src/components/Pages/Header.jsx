// Header.js
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo-header.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <img src={logo} alt="Logo" className="logo-image" /> 
            </div>
            <nav className="header-nav">
               
                    <Link to="/">Home</Link>
                    <Link to="/features">Features</Link>
                    <Link to="/industries">Industries</Link>
                    <Link to="/pricing">Price</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
                   
            </nav>
            <div className="header-buttons">
                
                <Link to="/login">
                <button className="login-button">Sing in</button>
                </Link>
                
                </div>
                <div className="header-buttons">   
                <Link to="/register">
                <button className="register-button">Sing Up</button>
                </Link>
                
           </div>
        </header>
    );
};


export default Header;