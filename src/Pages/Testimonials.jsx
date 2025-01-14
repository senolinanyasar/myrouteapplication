// Testimonials.js
import React from "react";
import './Testimonials.css';

const Testimonials = () =>{
    return (
        <section className="testimonials">
            <h2>Müşterilerimizin Söyledikleri</h2>
            <div className="testimonial-list">
                <div className="testimonial-item">
                    <p>"Bu yazılım işimizi dönüştürdü! Kesinlikle tavsiye ederim."</p>
                    <h4>- Ahmet</h4>
                </div>
                <div className="testimonial-item">
                    <p>"Kullanımı kolay ve mali durumumuzu yönetmek için inanılmaz derecede güçlü."</p>
                    <h4>- Mehmet</h4>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;