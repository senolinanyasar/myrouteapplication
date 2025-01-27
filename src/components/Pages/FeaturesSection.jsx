// FeaturesSection.js
import React from 'react';
import './FeaturesSection.css';
import locationImage from '../images/find-loca.png'; 
import crmImage from '../images/crm.png'; 
import salesImage from '../images/sales-track.png'; 
import routeImage from '../images/route.png'; 
import reportingImage from '../images/reporting.png'; 
import stockImage from '../images/stock.png'; 

const FeaturesSection = () => {
    return (
        <section className="features-section">
            <h2 className='features-title'>Everything You Need <br /> in One Application</h2>
            <div className='feature'>
                <div className='feature-text'>
                    <h3>Finding customers is now very easy!</h3>
                    <p>Expand your market by quickly finding customers in the sector you sell to with our location finder plugin</p>
                
               
            </div>
            <div className='feature-image'>
            <img src={locationImage} alt="Location Feature" />
            </div>
            </div>
            
            <div className='feature'>
                <div className='feature-text'>
                    <h3>Effortless Customer Management</h3>
                    <p>Customer Management helps you efficiently manage customer relationships with tools for viewing customer details, past orders, and payments. Easily update information and improve workflows to enhance customer satisfaction.</p>
                
                
            </div>
            <div className='feature-image'>
            <img src={crmImage} alt="CRM Image" />
            </div>
            </div>
            <div className='feature'>
                <div className='feature-text'>
                    <h3>Seamless Sales Tracking</h3>
                    <p>Monitor and manage your sales performance in real time, ensuring accurate records and improved decision-making.</p>
                
               
            </div>
            <div className='feature-image'>
            <img src={salesImage} alt="Sales Feature" />
            </div>
            </div>
            <div className='feature'>
                <div className='feature-text'>
                    <h3>Location-Based Customer Route Optimization</h3>
                    <p>Efficiently plan and optimize customer routes using location data, saving time and maximizing productivity.</p>
            </div>
            <div className='feature-image'>
            <img src={routeImage} alt="Route Feature" />
            </div>
            </div>
            <div className='feature'>
                <div className='feature-text'>
                    <h3>Comprehensive Reporting</h3>
                    <p>Gain valuable insights with detailed reports on sales, expenses, and stock, helping you make informed decisions for business growth.</p>
            </div>
            <div className='feature-image'>
            <img src={reportingImage} alt="Route Feature" />
            </div>
            </div>
            <div className='feature'>
                <div className='feature-text'>
                    <h3>Efficient Stock Tracking</h3>
                    <p>Easily monitor and manage your inventory levels in real time to prevent shortages and optimize stock performance.</p>
            </div>
            <div className='feature-image'>
            <img src={stockImage} alt="Stock Feature" />
            </div>
            </div>
        </section>
    );
};

export default FeaturesSection;