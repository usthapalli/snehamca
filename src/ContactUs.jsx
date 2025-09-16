import React from 'react';
import './contactus.css';

function ContactUs() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Get in Touch 🍕</h1>
      <p className="contact-subtitle">We’d love to hear from you! Whether it’s feedback, support, or just saying hi.</p>

      <div className="contact-grid">
        {/* Contact Info */}
        <div className="contact-info">
          <h2>📍 Our Office</h2>
          <p>Delight Delivered Pvt. Ltd.</p>
          <p>123 Foodie Street, Hyderabad, India</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 support@delightdelivered.in</p>

          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">🌐 Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">📸 Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦 Twitter</a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form">
          <h2>✉️ Send Us a Message</h2>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message..." rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;