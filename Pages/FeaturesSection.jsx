// FeaturesSection.js
import React from 'react';
import './FeaturesSection.css';
import locationImage from '../images/location.jpg'; 

const FeaturesSection = () => {
    return (
        <section className="features-section">
            <h2 className='features-title'>Everything You Need <br /> in One Application</h2>
            <div className='feature'>
                <div className='feature-text'>
                    <h3>Finding customers is now very easy!</h3>
                    <p>Expand your market by quickly finding customers in the sector you sell to with our location finder plugin</p>
                
                <button className='cta-button'>Detail</button>
            </div>
            <div className='feature-image'>
            <img src={locationImage} alt="Location Feature" />
            </div>
            </div>
            
            <div className='feature'>
                <div className='feature-text'>
                    <h3>Finding customers is now very easy!</h3>
                    <p>Expand your market by quickly finding customers in the sector you sell to with our location finder plugin</p>
                
                <button className='cta-button'>Detail</button>
            </div>
            <div className='feature-image'>
            <img src={locationImage} alt="Location Feature" />
            </div>
            </div>
            <div className='feature'>
                <div className='feature-text'>
                    <h3>Finding customers is now very easy!</h3>
                    <p>Expand your market by quickly finding customers in the sector you sell to with our location finder plugin</p>
                
                <button className='cta-button'>Detail</button>
            </div>
            <div className='feature-image'>
            <img src={locationImage} alt="Location Feature" />
            </div>
            </div>
            <div className='feature'>
                <div className='feature-text'>
                    <h3>Finding customers is now very easy!</h3>
                    <p>Expand your market by quickly finding customers in the sector you sell to with our location finder plugin</p>
                
                <button className='cta-button'>Detail</button>
            </div>
            <div className='feature-image'>
            <img src={locationImage} alt="Location Feature" />
            </div>
            </div>
        </section>
    );
};

export default FeaturesSection;