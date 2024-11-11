// HomePage.js
import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';

const HomePage = () =>{
    return(
        <div>
            <Header/>
            <HeroSection/>
            <FeaturesSection/>
            <Footer/>
        </div>
    );
};

export default HomePage;