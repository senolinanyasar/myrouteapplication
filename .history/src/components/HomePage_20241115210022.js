// HomePage.js
import React from 'react';
import TopBar from './TopBar';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PricingSection from './PricingSection';
import SupportSection from './SupportSection';
import IndustriesTab from './IndustriesTab';
import Footer from './Footer';

const HomePage = () => {
    return (
        <div>
        
            <HeroSection />
            <FeaturesSection />
            <SupportSection />
            <IndustriesTab />
            <PricingSection />
            <Footer />
        </div>
    );
};

export default HomePage;