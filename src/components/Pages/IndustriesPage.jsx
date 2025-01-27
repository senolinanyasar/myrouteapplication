import React from "react";
import './IndustriesPage.css';
import distributorImage from '../images/sarah.png';
import wholesaleImage from '../images/john.png';
import productionImage from '../images/linda.png';
import { Link } from "react-router-dom";

const industries = [
    {
        id: 'distributor',
        title: 'Distributor / Field Sales',
        header: 'Streamlined Inventory to Order Management',
        description:
            'Designed for hot or cold field sales operations, manage your inventory, customers, and orders instantly via a web application.',
        features: [
            {
                title: 'Inventory Management',
                description: 'Track and update your inventory in real-time with sales data.',
            },
            {
                title: 'Team Management',
                description: 'Add team members and monitor their daily sales and orders.',
            },
            {
                title: 'Customer Management',
                description:
                    'View customer details, past orders, invoices, and payments directly on the map.',
            },
        ],
        testimonial: {
            name: 'From Our Users: Sarah',
            feedback:
                '“My Route Application is easy to use and provides all the tools we need at an affordable price. I can show my customers their invoices and account details directly from my tablet during visits.”',
            button: 'Discover the Differences',
            image: distributorImage,
        },
    },
    {
        id: 'wholesale',
        title: 'Wholesale / Retail Sales',
        header: 'Effortless Sales and Stock Management',
        description:
            'For wholesalers and retailers, My Route Application ensures seamless integration of sales tracking and inventory management.',
        features: [
            {
                title: 'Point of Sale Integration',
                description: 'Easily manage in-store sales and update inventory automatically.',
            },
            {
                title: 'Sales Reporting',
                description:
                    'Get detailed insights into sales performance to optimize your strategy.',
            },
            {
                title: 'Customer Relationship Management',
                description: 'Build and nurture relationships with your customers effectively.',
            },
        ],
        testimonial: {
            name: 'From Our Users: John',
            feedback:
                '“My Route Application has revolutionized how we track and manage sales. It’s intuitive, reliable, and a great value for money.”',
            button: 'Discover the Differences',
            image: wholesaleImage,
        },
    },
    {
        id: 'production',
        title: 'Production',
        header: 'From Materials to Final Products',
        description:
            'Manage every stage of your production process efficiently, from raw materials to finished goods.',
        features: [
            {
                title: 'Raw Material Tracking',
                description:
                    'Track and manage your raw materials inventory to avoid shortages.',
            },
            {
                title: 'Production Scheduling',
                description: 'Plan and execute production schedules with precision.',
            },
            {
                title: 'Cost Analysis',
                description:
                    'Analyze production costs to optimize your budget and increase profitability.',
            },
        ],
        testimonial: {
            name: 'From Our Users: Linda',
            feedback:
                '“With My Route Application, managing our production pipeline has become so much easier. We can now track every stage of the process in real-time.”',
            button: 'Discover the Differences',
            image: productionImage,
        },
    },
];

const IndustriesPage = () => {
    return (
        <div className="industries-page">
            <div className="industries-header">
                <h1>Tell Us Your Businesses, We'll Offer the Solution!</h1>
                <p>My Route Application, the comprehensive accounting program, caters to different sectors with unique
                    solutions, helping you manage your business and financial data efficiently.</p>
                <div className="industries-buttons">
                    {industries.map((industry) => (
                        <button
                            key={industry.id}
                            className="industry-button"
                            onClick={() => document.getElementById(industry.id).scrollIntoView({ behavior: 'smooth' })}
                        >
                            {industry.title}
                        </button>
                    ))}
                </div>
            </div>
            {industries.map((industry) => (
                <section key={industry.id} id={industry.id} className="industry-section">
                    <div className="industry-title-box">
                        <h2>#{industry.title}</h2>
                    </div>
                    <h3 className="industry-header">{industry.header}</h3>
                    <p className="industry-description">{industry.description}</p>
                    <div className="industry-features">
                        {industry.features.map((feature, index) => (
                            <div key={index} className="industry-feature">
                                <h4>{feature.title}</h4>
                                <div className="feature-divider"></div>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="industry-testimonial">
                        <div className="testimonial-text">
                            <h4>{industry.testimonial.name}</h4>
                            <p>{industry.testimonial.feedback}</p>
                            <Link to="/features">
                            <button className="testimonial-button">{industry.testimonial.button}</button>
                            </Link>
                        </div>
                        <div className="testimonial-image">
                            <img src={industry.testimonial.image} alt={industry.testimonial.name} />
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};


export default IndustriesPage;