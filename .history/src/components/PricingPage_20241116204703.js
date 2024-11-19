// PricingPage.js

import React, { useState } from "react";
import './PricingPage.css';
import { FaCheck, FaTimes } from "react-icons/fa";


const PricingPage = () => {
    const [isAnnual, setIsAnnual] = useState(false);

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
                        {isAnnual ? "$1,000/year" : "$100/month"}
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
                        {isAnnual ? "$3,000/year" : "$299/month"}
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


            <div className="comparison-table">
                <h2>Compera Pages in Detail</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Features</th>
                            <th>Basic Package</th>
                            <th>Premium Package</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Basic Accounting</td>
                            <td><FaCheck /></td>
                            <td><FaCheck /></td>
                        </tr>
                        <tr>
                            <td>Location-Based Customer Search</td>
                            <td><FaTimes className="not-included" /></td>
                            <td><FaCheck /></td>
                        </tr>
                        <tr>
                            <td>Location-Based Customer Search</td>
                            <td><FaTimes className="not-included" /></td>
                            <td><FaCheck /></td>
                        </tr>
                        <tr>
                            <td>Location-Based Customer Search</td>
                            <td><FaTimes className="not-included" /></td>
                            <td><FaCheck /></td>
                        </tr>
                        <tr>
                            <td>Location-Based Customer Search</td>
                            <td><FaTimes className="not-included" /></td>
                            <td><FaCheck /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="features-expand">
                <h2> All-Inclusive Features</h2>
                <div className="feature">
                    <button className="feature-toggle">+ Location-Based Customer Search</button>
                    <p className="feature-description">Easily find and reach potential customers in your target areas.</p>
                </div>
                <div className="feature">
                    <button className="feature-toggle">+  Inventory Tracking</button>
                    <p className="feature-description">Keep track of your stock levels and avoid overstocking or stockouts.</p>
                </div>
                <div className="feature">
                    <button className="feature-toggle">+ Advanced Reporting</button>
                    <p className="feature-description">Get in-depth insights into your business performance with custom reports.</p>
                </div>
            </div>
        </section>
    );

};

export default PricingPage;