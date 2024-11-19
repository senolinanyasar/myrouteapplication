// HomePage.js
import React from 'react';
import TopBar from './TopBar';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PricingSection from './PricingSection';
import IndustriesSection from './IndustriesSection';
import Footer from './Footer';

const HomePage = () => {
    return (
        <div>
            <TopBar /> 
            <Header />
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <IndustriesSection />
            <Footer />
        </div>
    );
};

export default HomePage;