// HeroSection.js
import React from 'react';
import './HeroSection.css';

const HeroSection = () =>{
    return(
        <section className="hero">
            <div className='hero-content'>
                <div className='hero-text'>
                    <h1>Customer Finding and Account Management Application Coming from the Heart of Commerce</h1>
                    <p>Increase your sales by finding your customers quickly.</p>
                    <button className='cta-button'>Let's Get it</button>
                </div>
                <div className='hero-image'>
                    <img src='' alt="Hero"/>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;