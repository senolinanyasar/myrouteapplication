// Footer.js

import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className='footer-container'>
                {/* Logo ve Adres */}
                <div className='footer-logo-section'>
                    <h2 className='footer-logo'>MyRouteApp</h2>
                    <p>Şirket Adres : İZMİR</p>
                    <div className='social-icons'>
                        <FaFacebook />
                        <FaTwitter />
                        <FaInstagram />
                        <FaLinkedin />
                        <FaYoutube />
                    </div>
                </div>

                {/* Site Haritası */}
                <div className="footer-links">
                    <h3>Özellikler</h3>
                    <ul>
                        <li>-----------</li>
                        <li>-----------</li>
                        <li>-----------</li>
                        <li>-----------</li>
                        <li>-----------</li>
                        <li>-----------</li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h3>Şirket</h3>
                    <ul>
                        <li>-----------</li>
                        <li>-----------</li>
                        <li>-----------</li>
                        <li>-----------</li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h3>Hakkımızda</h3>
                    <ul>
                        <li>Gizlilik Koşulları</li>
                        <li>KVKK Aydınlatma Metni</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Tüm hakları saklıdır.</p>
            </div>
        </footer>
    );
};

export default Footer;