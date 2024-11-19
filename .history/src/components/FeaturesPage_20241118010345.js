// FeaturesPage.js

import React, { useState } from "react";
import './FeaturesPage.css';
import { FaChartLine, FaUserFriends, FaFileInvoice, FaTruck } from 'react-icons/fa';

const features = [
    {
        id: 1,
        title: 'Customer Management',
        icon: <FaUserFriends />,
        shortDescription: 'Effortlessly manage your customer details and interactions.',
        detailedDescription:
            'With My Route Application, you can store customer details, view past orders, track invoices, and manage communication efficiently.',
    },
    {
        id: 2,
        title: 'Advanced Reporting',
        icon: <FaChartLine />,
        shortDescription: 'Gain insights into your business with detailed reports.',
        detailedDescription:
            'Our advanced reporting tools help you track sales, customer trends, and performance metrics to make informed decisions.',
    },
    {
        id: 3,
        title: 'Invoice Management',
        icon: <FaFileInvoice />,
        shortDescription: 'Simplify your invoice management process.',
        detailedDescription:
            'Generate, manage, and send invoices to customers with ease. Keep track of paid and unpaid invoices directly from the app.',
    },
    {
        id: 4,
        title: 'Invoice Management',
        icon: <FaFileInvoice />,
        shortDescription: 'Simplify your invoice management process.',
        detailedDescription:
            'Generate, manage, and send invoices to customers with ease. Keep track of paid and unpaid invoices directly from the app.',
    },
    {
        id: 5,
        title: 'Invoice Management',
        icon: <FaFileInvoice />,
        shortDescription: 'Simplify your invoice management process.',
        detailedDescription:
            'Generate, manage, and send invoices to customers with ease. Keep track of paid and unpaid invoices directly from the app.',
    },
    {
        id: 6,
        title: 'Invoice Management',
        icon: <FaFileInvoice />,
        shortDescription: 'Simplify your invoice management process.',
        detailedDescription:
            'Generate, manage, and send invoices to customers with ease. Keep track of paid and unpaid invoices directly from the app.',
    },
    {
        id: 7,
        title: 'Invoice Management',
        icon: <FaFileInvoice />,
        shortDescription: 'Simplify your invoice management process.',
        detailedDescription:
            'Generate, manage, and send invoices to customers with ease. Keep track of paid and unpaid invoices directly from the app.',
    },
];

const FeaturesPage = () =>{
    const [activeFeature, setActiveFeature] = useState(null);
    const handleFeatureClick = (id) =>{
        setActiveFeature(id === activeFeature ? null : id);
    };
    return (
        <div className="features-page">
            <div className="features-hero">
                <h1>Explore the Powwer Of My Route Application!</h1>
                <p>
                Our application offers a wide range of features tailored to streamline your operations, manage your business efficiently, and boost your productivity.
                </p>
            </div>
            <div className="features-grid">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}
                        onClick={() => handleFeatureClick(feature.id)}
                    >
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.shortDescription}</p>
                    </div>
                ))}
            </div>

            {activeFeature && (
                <div className="feature-details">
                    <h2>{features.find((feature) => feature.id === activeFeature).title}</h2>
                    <p>{features.find((feature) => feature.id === activeFeature).detailedDescription}</p>
                </div>
            )}

            <div className="features-cta">
                <button className="cta-button">Try My Route Application Now</button>
            </div>
        </div>
    );
};


export default FeaturesPage;