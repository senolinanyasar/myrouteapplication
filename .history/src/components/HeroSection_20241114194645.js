// HeroSection.js
import React from 'react';
import './HeroSection.css';

const HeroSection = () =>{
    return(
        <section className="hero">
            <div className='hero-content'>
                <div className='hero-text'>
                    <h1>--------------------</h1>
                    <p>----------------------</p>
                    <button className='cta-button'>-------</button>
                </div>
                <div className='hero-image'>
                    <img src='' alt="Hero"/>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;