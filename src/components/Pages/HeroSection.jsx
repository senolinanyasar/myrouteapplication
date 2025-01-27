// HeroSection.js
import React from 'react';
import './HeroSection.css';
import herosectionimage from '../images/hero.png';
import { Link } from 'react-router-dom';

const HeroSection = () =>{
    return(
        <section className="hero">
            <div className='hero-content'>
                <div className='hero-text'>
                    <h2>Customer Finding and Account Management Application Coming from the Heart of Commerce</h2>
                    <p>Increase your sales by finding your customers quickly.</p>
                    <Link to="/register">
                    <button className='cta-button'>Let's Get it</button>
                    </Link>
                </div>
                <div className='hero-image'>
                    <img src={herosectionimage} alt="Hero"/>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;