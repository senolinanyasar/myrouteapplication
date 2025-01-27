// Footer.js

import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import logo from '../images/logo-header.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className='footer-content'>
                <div className='footer-left'>
                    <div className="footer-logo">
                        <img src={logo} alt="Logo" className="logo-image" />
                    </div>
                    <p>Kazımdirik Mahallesi, Üniversite <br />Caddesi Ağaçlı Yol No: 37-39, <br />35100 Bornova/İzmir</p>
                    <div className='social-icons'>
                        <FaFacebook />
                        <FaTwitter />
                        <FaInstagram />
                        <FaLinkedin />
                        <FaYoutube />
                    </div>
                </div>

                <div className="footer-right">
                    <br /><br /><br /><br />
                    <div className='footer-section'>
                        <h4>Features</h4>
                        <ul>
                            <li>Location-Based Customer Search</li>
                            <li>Customer Management</li>
                            <li>Customer Tracking</li>
                            <li>Sales Tracking</li>
                            <li>Basic Accounting</li>
                            <li>Inventory Tracking</li>
                            <li>Reporting</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Privileges</h4>
                        <ul>
                            <li>Industries</li>
                            <li>Pricing</li>
                            <li>Support</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>About Us</h4>
                        <ul>
                            <li>Privacy Policy</li>
                            <li>KVKK Disclosure Text</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 My Route Application. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;