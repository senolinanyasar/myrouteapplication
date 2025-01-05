// ContactPage.js

import React, { useState } from "react";
import "./ContactPage.css";

const faqs = [
    {
        question: "How can I contact customer support?",
        answer:
            "You can reach us via phone at +90 555 555 55 55 or email at contact@myrouteapplication.com.",
    },
    {
        question: "What are your business hours?",
        answer:
            "Our support team is available from Monday to Friday, 9:00 AM to 6:00 PM.",
    },
    {
        question: "Where is your company located?",
        answer:
            "We are located at Kazımdirik Mahallesi, Üniversite Caddesi Ağaçlı Yol No: 37-39, 35050 Bornova/İzmir.",
    },

    {
        question: "How can I start using Myroute Application?",
        answer:
            "You can start using Myroute Application without any installation by just signing up from the website. After your membership process, you can continue using it by choosing one of the monthly or annual subscription options.",
    },
    {
        question: "Is it possible to use Myroute Application when there is no internet?",
        answer:
            "Myroute Application is a web-based service. You cannot access Our Account unless you have internet access.",
    },
    {
        question: "Which accounting transactions can I track with Myroute Application?",
        answer:
            "Myroute Application is the program that you can use to manage your pre-accounting in the most comprehensive way. You can track all the items you need while managing your business from income and expense tracking to cash flow, from current tracking to receivables tracking, all from a single panel.",
    },
    {
        question: "Which accounting transactions can I track with Myroute Application?",
        answer:
            "Myroute Application is the program that you can use to manage your pre-accounting in the most comprehensive way. You can track all the items you need while managing your business from income and expense tracking to cash flow, from current tracking to receivables tracking, all from a single panel.",
    },
];


const ContactPage = () => {
    const [activeFaq, setActiveFaq] = useState(null);
    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    }
    return (
        <div className="contact-page">
            <div className="contact-header">
                <h1>Get in Touch</h1>
                <p>We're her to answer your questions and help you succeed.</p>
            </div>

            <div className="contact-content">
                <div className="contact-form">
                    <h2>Send Us a Message</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="name" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" placeholder="Your Phone Number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                placeholder="Your Message"
                                required></textarea>
                        </div>
                        <button type="submit" className="submit-button">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="contact-details">
                    <h2>Contact Information</h2>
                    <p>We’d love to hear from you! Reach out to us using the details below:</p>
                    <ul>
                        <li>
                            <strong>Address:</strong> Kazımdirik Mahallesi, Üniversite Caddesi
                            Ağaçlı Yol No: 37-39, 35050 Bornova/İzmir
                        </li>
                        <li>
                            <strong>Phone:</strong> {" "}
                            <a href="tel:+905555555555">+90 555 555 55 55</a>
                        </li>
                        <li>
                            <strong>Email:</strong>{" "}
                            <a href="mailto:contact@myrouteapplication.com">
                                contact@myrouteapplication.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="map-container">
                <h2>Find Us Here</h2>
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/dir/38.4663552,27.181056/ya%C5%9Far+%C3%BCniversitesi/@38.4591055,27.1754348,14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x14b97d34b9894483:0xccea44297ef6299!2m2!1d27.2022886!2d38.4547698?entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
            <div className="faq-container">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${activeFaq === index ? "active" : ""}`}
                            onClick={() => toggleFaq(index)}
                        >
                            <div className="faq-question">
                                <h4>{faq.question}</h4>
                                <span>{activeFaq === index ? "-" : "+"}</span>
                            </div>
                            {activeFaq === index && (
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;