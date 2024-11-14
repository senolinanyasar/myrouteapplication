// IndustriesTab.js
import React, { useState } from "react";
import './IndustriesTab.css';
import distributorImage from '../images/supportimage.jpg'
import wholesaleImage from '../images/supportimage.jpg'
import productionImage from '../images/supportimage.jpg'




const IndustriesContent = {
    distributorFieldSales: {
        title: "Distributor / Field Sales",
        description: "Ideal for field sales teams and distributors to streamline customer engagement and sales management.",
        image: distributorImage,
        features: [
            { title: "Location-Based Customer Search", text: "Find potential customers nearby to target efficiently in the field." },
            { title: "Customer Management", text: "Organize and manage your customer database with ease." },
            { title: "Sales Tracking", text: "Track sales performance and gather insights." },
            { title: "Reporting", text: "Generate comprehensive sales reports to assess performance." }
        ]
    },
    wholesaleRetail: {
        title: "wholesale / Retail Sales",
        description: "Designed for wholesale and retail businesses to manage inventory and customer interactions seamlessly.",
        image: wholesaleImage,
        features: [
            { title: "Customer Management", text: "Maintain customer profiles and track interactions." },
            { title: "Inventory Tracking", text: "Keep accurate inventory records and prevent stock issues." },
            { title: "Sales Tracking", text: "Monitor sales across retail and wholesale channels." },
            { title: "Basic Accounting", text: "Manage finances and transactions for better accounting." },
            { title: "Reporting", text: "Generate sales and stock reports to optimize operations." }
        ]

    },
    production: {
        title: "Production",
        description: "Perfect for manufacturing businesses to manage stock and production-related customer needs.",
        image: productionImage,
        features: [
            { title: "Inventory Tracking", text: "Track raw materials and finished goods efficiently." },
            { title: "Customer Management", text: "Organize customer details for efficient order processing." },
            { title: "Basic Accounting", text: "Handle finances and basic bookkeeping." },
            { title: "Reporting", text: "Generate production and sales reports for operational insights." }
        ]
    }
};


const IndustriesTab = () => {
    const [activaTab, setActiveTab] = useState("distributorFieldSales");
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const { title, description, image, features } = industriesContent[activeTab];
    return (
        <section className="industries-tab">
            <h2 className="tabs-title">Industries We Serve</h2>
            <div className="tabs-buttons">
                <button onClick={() => handleTabChange("distributorFieldSales")}>Distributor / Field Sales</button>
                <button onClick={() => handleTabChange("wholesaleRetail")}>Wholesale / Retail Sales</button>
                <button onClick={() => handleTabChange("production")}>Production</button>
            </div>
            <div className="tabs-content">
                <div className="tabs-text">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    {features.map((feature,index)=> (
                        <div key={index} className="tabs-feature">
                            <strong>{feature.title}</strong>
                            <p>{feature.text}</p>
                            </div>
                    ))}
                </div>
                <div className="tabs-image">
                    <img src={image} alt={title}/>
                </div>
            </div>
        </section>
    );
};

export default IndustriesTab;