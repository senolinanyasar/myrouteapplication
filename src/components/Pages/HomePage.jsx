// HomePage.js
import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PricingSection from './PricingSection';
import SupportSection from './SupportSection';
import IndustriesTab from './IndustriesTab';
import Header from './Header';
import TopBar from './TopBar';

const HomePage = () => {
    return (
        <div>
           
            <HeroSection />
            <FeaturesSection />
            <SupportSection />
            <IndustriesTab />
            <PricingSection />
           
        </div>
    );
};

export default HomePage;