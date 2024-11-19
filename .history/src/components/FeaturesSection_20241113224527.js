// FeaturesSection.js
import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
    return (
        <section className="features">
            <h2>Özelliklerimiz</h2>
            <div className="features-list">
            <div className="feature-item">Müşteri Bulma</div>
            <div className="feature-item">Stok Yönetimi</div>
            <div className="feature-item">Müşteri Takibi</div>
            <div className="feature-item">Satış Analizi</div>
            <div className="feature-item">Raporlamalar</div>
            </div>
        </section>
    );
};

export default FeaturesSection;