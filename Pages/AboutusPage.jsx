import React from "react";
import './AboutusPage.css';
import teamImage1 from '../images/team1.jpeg';
import teamImage2 from '../images/team2.jpeg';




const AboutusPage = () => {
    return (
        <div className="about-us-page">
            <div className="about-header">
            <h1>Who Are We?</h1>
                <p>
                    In Turkey, nearly 100,000 SMEs join the economy each year, contributing to the country’s economic backbone.
                    Our journey began as two ambitious software engineering students from Yaşar University, with a mission to
                    create a system that meets the operational needs of businesses everywhere.
                </p>
                <p>
                    With the foundation of My Route Application, we aim to provide seamless solutions for businesses, offering
                    them tools to manage finances, enhance efficiency, and grow stronger every day.
                </p>
            </div>
            <div className="about-mission">
                <p className="highlight">
                    Growing alongside SMEs, My Route Application is driven by its mission to revolutionize operational
                    efficiency, empowering businesses to thrive in the modern world.
                </p>
                <p>
                    Our goal is simple yet impactful: deliver exceptional operational solutions while reinforcing the financial
                    stability of businesses. With a focus on efficiency and innovative technology, we aim to simplify commerce and help businesses overcome challenges.
                </p>
                <p>
                    Join us in this journey, where every successful SME contributes to the economy and inspires growth across
                    borders. Together, let’s succeed.
                </p>
                <a href="#contact" className="cta-button">Join Us</a>
            </div>
            <div className="about-team">
                <img src={teamImage1} alt="image1" />
                <img src={teamImage2} alt="image2" />
               
            </div>
        </div>
    );
}

export default AboutusPage;