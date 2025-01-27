// TopBar.js
import React from 'react';
import './TopBar.css';

const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="top-bar-content">
                <span>Help</span>
                <span>0232 323 3223</span>
                <a href="/contact">Contact</a>
            </div>
        </div>
    );
};

export default TopBar;