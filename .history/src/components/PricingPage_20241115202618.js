// PricingPage.js

import React from "react";
import './PricingPage.css';
import { FaCheck, FaTimes } from "react-icons/fa";


const PricingPage = () => {
    const [isAnnual, setIsAnnual] = use(false);
    const togglePricing = () => {
        setIsAnnual(!isAnnual);
    };

    return (
        <section className="pricing-page">
            <div className="pricing-header">
                <h1>Manage Your Account with Ease!</h1>
                <p>Start using Turkey's most comprehensive program at affordable prices.</p>
                <div className="toggle-button">
                    <button onClick={() => setIsAnnual(false)} className={!isAnnual ? 'active' : ''}>Monthly</button>
                    <button onClick={() => setIsAnnual(true)} className={isAnnual ? 'active' : ''}>Annual</button>
                </div>
            </div>

            <div className="price-plans">
                <div className="plan basic">
                    <h3>Basic Package</h3>
                    <p className="price">{isAnnual ? ' 999/year' : '99/month'}</p>
                    <ul>
                        <li><FaCheck /> Basic Accounting</li>
                        <li><FaCheck /> Customer Management</li>
                        <li><FaCheck /> Inventory Tracking</li>
                        <li><FaCheck /> Sales Tracking</li>
                        <li><FaTimes className="not-included" />Location-Based Customer Search</li>
                    </ul>
                </div>
                <div className="plan basic">
                    <h3>Premium Package</h3>
                    <p className="price">{isAnnual ? '2,799/year' : '99/month'}</p>
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
                            <td><FaTimes className="not-included"/></td>
                            <td><FaCheck /></td>
                        </tr>
                        <tr>
                            <td>Location-Based Customer Search</td>
                            <td><FaTimes className="not-included"/></td>
                            <td><FaCheck /></td>
                        </tr>
                        <tr>
                            <td>Location-Based Customer Search</td>
                            <td><FaTimes className="not-included"/></td>
                            <td><FaCheck /></td>
                        </tr>
                        <tr>
                            <td>Location-Based Customer Search</td>
                            <td><FaTimes className="not-included"/></td>
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