// PricingSection.js
import React from "react";
import './PricingSection.css';

const PricingSection = () => {
    return (
        <section className="pricing">
        <h2>Abonelik Planı</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Basit Plan</h3>
            <p>₺500/Aylık</p>
            <ul>
              <li>Müşteri Takibi</li>
              <li>Ürün ve Stok Takibi</li>
              <li>Finansal Veri Takibi</li>
            </ul>
            <button className="cta-button">Basit Seçim</button>
          </div>
          <div className="pricing-card">
            <h3>Gelişmiş Plan</h3>
            <p>₺900/Aylık</p>
            <ul>
              <li>Lokasyon</li>
              <li>Müşteri Takibi</li>
              <li>Ürün ve Stok Takibi</li>
              <li>Finansal Veri Takibi</li>
            </ul>
            <button className="cta-button">Gelişmiş Seçim</button>
          </div>
          </div>
      </section>
    );
};

export default PricingSection;