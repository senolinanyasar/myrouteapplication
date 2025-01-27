// PricingSection.js
import React from "react";
import './PricingSection.css';
import { Link } from 'react-router-dom';

const PricingSection = () => {
    return (
        <section className="pricing-section">

          <div className="price-content">
          <h2>Affordable Prices for Those Who Know Their Worth at My Route Application!</h2>
          <Link to="/pricing">
          <button className="cta-button">Check Prices</button>
          </Link>
          
          </div>
      </section>
    );
};

export default PricingSection;