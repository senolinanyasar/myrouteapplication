//SupportSection.js
import React from "react";
import './SupportSection.css';
import supportImage from '../images/location.jpg';


const SupportSection = () =>{
    return (
        <section className="support-section">
            <div className="support-content">
                <div className="support-text">
                <h2>We're Here for You When You Need Us!</h2>
          <p>We care about your business as much as you do.</p>
          <p>Whenever you need support, we are just a phone call away!</p>
          <button className="cta-button">Contact Us</button>
                </div>
                <div className="support-image">
                <img src={supportImage} alt="Support Team" />
                </div>
            </div>
        </section>
    );
};

export default SupportSection;