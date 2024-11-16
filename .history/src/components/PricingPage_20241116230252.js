// PricingPage.js

import React, { useState } from "react";
import './PricingPage.css';
import { FaCheck, FaTimes } from "react-icons/fa";

const featuresData = [
    {
        title: 'Location-Based Customer Search',
        description:
            'Quickly find potential customers in a specific region based on industry and proximity using Google Maps integration.',
    },
    {
        title: 'Customer Management',
        description:
            'Organize, update, and manage your customer database effectively. Track customer details and communication history.',
    },
    {
        title: 'Customer Tracking',
        description:
            'Monitor your customers’ activity and interaction history to ensure consistent and effective communication.',
    },
    {
        title: 'Sales Tracking',
        description:
            'Track sales performance, identify trends, and analyze sales data to optimize your revenue streams.',
    },
    {
        title: 'Basic Accounting',
        description:
            'Keep track of your financial data, including income, expenses, and profit margins, with easy-to-use tools.',
    },
    {
        title: 'Inventory Tracking',
        description:
            'Monitor stock levels in real-time, receive alerts for low inventory, and streamline inventory management.',
    },
    {
        title: 'Advanced Reporting',
        description:
            'Generate detailed reports on sales, inventory, and customer activity to make data-driven decisions.',
    },
    {
        title: 'Multi-User Access',
        description:
            'Allow team members to access and manage different areas of the system with customizable permissions.',
    },
];

const PricingPage = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null :index);
    };

    return (
        <section className="pricing-page">
            <div className="pricing-header">
                <h1>Manage Your Accounting with Ease!</h1>
                <p>Start using Turkey's most comprehensive program at affordable prices.</p>
                <div className="toggle-buttons">
                    <button
                        className={`toggle-btn ${!isAnnual ? "active" : ""}`}
                        onClick={() => setIsAnnual(false)}
                    >
                        Monthly
                    </button>
                    <button
                        className={`toggle-btn ${isAnnual ? "active" : ""}`}
                        onClick={() => setIsAnnual(true)}
                    >
                        Annual
                    </button>
                </div>
            </div>
            <div className="pricing-plans">
                <div className="plan basic-plan">
                    <h3>Basic Plan</h3>
                    <p className="price">
                        {isAnnual ? "$999/year" : "$99/month"}
                    </p>
                    <p className="subtext">
                        Designed for businesses without digital sales operations.
                    </p>
                    <button className="try-button">14-Day Free Trial</button>
                    <ul>
                        <li><FaCheck /> Basic Accounting</li>
                        <li><FaCheck /> Customer Management</li>
                        <li><FaCheck /> Inventory Tracking</li>
                        <li><FaCheck /> Sales Tracking</li>
                        <li><FaTimes className="not-included" />Location-Based Customer Search</li>
                    </ul>
                </div>
                <div className="plan premium-plan">
                    <h3>Premium Plan</h3>
                    <p className="price">
                        {isAnnual ? "$2.799/year" : "$299/month"}
                    </p>
                    <p className="subtext">
                        Take your sales digital and manage everything in one place.
                    </p>
                    <button className="try-button">14-Day Free Trial</button>

                    <ul>
                        <li><FaCheck /> Basic Accounting</li>
                        <li><FaCheck /> Customer Management</li>
                        <li><FaCheck /> Inventory Tracking</li>
                        <li><FaCheck /> Sales Tracking</li>
                        <li><FaCheck /> Location-Based Customer Search</li>
                        <li><FaCheck /> Advanced Reporting</li>
                    </ul>
                </div>
            </div>


            <div className="comparison-table-container">
                <h2>Compare Plans in Detail</h2>
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Features</th>
                            <th>Basic Plan</th>
                            <th>Premium Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Location-Based Customer Search</td>
                            <td><FaTimes className="icon-times" /></td>
                            <td><FaCheck className="icon-check" /></td>
                        </tr>
                        <tr>
                            <td>Customer Management</td>
                            <td><FaCheck className="icon-check" /></td>
                            <td><FaCheck className="icon-check" /></td>
                        </tr>
                        <tr>
                            <td>Customer Tracking</td>
                            <td><FaCheck className="icon-check" /></td>
                            <td><FaCheck className="icon-check" /></td>
                        </tr>
                        <tr>
                            <td>Sales Tracking</td>
                            <td><FaCheck className="icon-check" /></td>
                            <td><FaCheck className="icon-check" /></td>
                        </tr>
                        <tr>
                            <td>Basic Accounting</td>
                            <td><FaCheck className="icon-check" /></td>
                            <td><FaCheck className="icon-check" /></td>
                        </tr>
                        <tr>
                            <td>Inventory Tracking</td>
                            <td><FaCheck className="icon-check" /></td>
                            <td><FaCheck className="icon-check" /></td>
                        </tr>
                        <tr>
                            <td>Advanced Reporting</td>
                            <td><FaTimes className="icon-times" /></td>
                            <td><FaCheck className="icon-check" /></td>
                        </tr>
                        <tr>
                            <td>Multi-User Access</td>
                            <td><FaTimes className="icon-times" /></td>
                            <td><FaCheck className="icon-check" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="features-expand-container">
                <h2>All Features in One Application</h2>
                {featuresData.map((feature,index)=>(
                    <div key={index} className="feature-item">
                        <div className="feature-header" onClick={() => handleToggle(index)}>
                            <h3>{feature.title}</h3>
                            <span>{expandedIndex === index ? '-' : '+'}</span>
                        </div>
                        {expandedIndex == index && (
                            <div className="feature-description">
                                <p>{feature.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </section>
    );

};

export default PricingPage;