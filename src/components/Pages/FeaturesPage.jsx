// FeaturesPage.js

import React, { useState } from "react";
import './FeaturesPage.css';
import { FaCheckCircle } from "react-icons/fa";
import feature1Image from "../images/crm.png";
import feature2Image from "../images/find-loca.png";
import feature3Image from "../images/stock.png";
import feature4Image from "../images/reporting.png";
import { Link } from "react-router-dom";

const featuresData = [
    {
        id: "feature1",
        title: "Customer Management",
        header: "Customer Management",
        description: "'Effortlessly manage your customer details and interactions.",
        details: [
            { feature: "Adding Automaticly Customer", description: " You can quickly and automatically add companies listed by the Location plugin to your customer list. " },
            { feature: "Sales View", description: "You can review your past sales to your customers and their current accounts." },
            { feature: "Tracking", description: "Track invoices, and manage communication efficiently." },
        ],
        image: feature1Image,
    },
    {
        id: "feature2",
        title: "Location-Based Customer Search",
        header: "Location",
        description: "Locate potential customers in your area",
        details: [
            { feature: "Searching", description: "Let us find potential customers that match the criteria you are looking for faster." },
            { feature: "List", description: "Let us list the customers that fit the parameters you provide." },
            { feature: "Route", description: "Let's create your most optimal route by selecting new customers listed or adding existing customers." },
        ],
        image: feature2Image,
    },
    {
        id: "feature3",
        title: "Product Management",
        header: "Product Management",
        description: "Easily track your inventory, manage product categories, and monitor sales performance to ensure smooth and efficient product operations.",
        details: [
            { feature: "Inventory Tracking", description: "Monitor stock levels in real time to prevent stockouts or overstocking and follow up with automatic stock adjustments after sales or purchases." },
            { feature: "Product Categorization", description: "Segment products into categories for better management." },
            { feature: "Price Management", description: "Create special offers or discounts for selected products." },
        ],
        image: feature3Image,
    },
    {
        id: "feature4",
        title: "Comprehensive Reporting",
        header: "Reporting",
        description: "Gain actionable insights into your business performance with detailed reports on sales, expenses, inventory, and customer data. Make data-driven decisions effortlessly.",
        details: [
            { feature: "Sales Reports", description: "Visualize sales trends and identify top-performing products or services." },
            { feature: "Expense Reports", description: "Identify areas where costs can be reduced or optimized." },
            { feature: "Customer Reports", description: "Segment customers based on their buying behavior or demographics." },
        ],
        image: feature4Image,
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
                <Link to="/register">
                <button className="cta-button">Get Started Now</button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturesPage;