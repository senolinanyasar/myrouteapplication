// FeaturesPage.js

import React, { useState } from "react";
import './FeaturesPage.css';
import { FaCheckCircle } from "react-icons/fa";
import feature1Image from "../images/feature1.jpg";
import feature2Image from "../images/feature2.jpg";
import feature3Image from "../images/feature3.jpg";

const featuresData = [
    {
        id: "feature1",
        title: "Customer Management",
        header: "Effortlessly manage your customer details and interactions.",
        description: "'With My Route Application, you can store customer details, view past orders, track invoices, and manage communication efficiently.",
        details: [
            { feature: "Adding Automaticly Customer", description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, " },
            { feature: "Customer Management", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
        ],
        image: feature1Image,
    },
    {
        id: "feature2",
        title: "Advanced Reporting",
        header: "Gain insights into your business with detailed reports.",
        description: "TOur advanced reporting tools help you track sales, customer trends, and performance metrics to make informed decisions.",
        details: [
            { feature: "Adding Automaticly Customer", description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, " },
            { feature: "Customer Management", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
        ],
        image: feature2Image,
    },
    {
        id: "feature3",
        title: "Invoice Management",
        header: "implify your invoice management process.",
        description: "Generate, manage, and send invoices to customers with ease. Keep track of paid and unpaid invoices directly from the app.",
        details: [
            { feature: "Adding Automaticly Customer", description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, " },
            { feature: "Customer Management", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
        ],
        image: feature3Image,
    },
];

const FeaturesPage = () => {
    const [activeFeature, setActiveFeature] = useState(featuresData[0].id);

    const scrollToFeature = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        setActiveFeature(id);
    };

    return (
        <div className="features-page">
            <header className="features-header">
                <h1>Explore the Key Features of Our Application</h1>
                <p>Learn more about the tools that will revolutionize your business operations.</p>
                <div className="features-buttons">
                    {featuresData.map((feature) => (
                        <button
                            key={feature.id}
                            className={`feature-button ${activeFeature === feature.id ? "active" : ""}`}
                            onClick={() => scrollToFeature(feature.id)}
                        >
                            {feature.title}
                        </button>
                    ))}
                </div>
            </header>

            {featuresData.map((feature) => (
                <section key={feature.id} id={feature.id} className="feature-section">
                    <div className="feature-content">
                        <h2>{feature.header}</h2>
                        <p>{feature.description}</p>
                        <ul>
                            {feature.details.map((detail, index) => (
                                <li key={index}>
                                    <FaCheckCircle className="feature-icon" />
                                    <strong>{detail.feature}</strong>: {detail.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="feature-image">
                        <img src={feature.image} alt={feature.title} />
                    </div>
                </section>
            ))}

            <div className="cta-section">
                <h3>Ready to Transform Your Business?</h3>
                <p>Sign up today and explore the limitless possibilities of our application!</p>
                <button className="cta-button">Get Started Now</button>
            </div>
        </div>
    );
};

export default FeaturesPage;