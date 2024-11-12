// Footer.js

import React from 'react';
import './Footer.css';

const Footer = () =>{
    return (
        <footer className="footer">
            <p>&copy; 2024 Şirketiniz. Tüm hakları saklıdır.</p>
            <p>Bizimle iletişime geçin: info@myrouteapp.com</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
             </div>
        </footer>
    );
};

export default Footer;