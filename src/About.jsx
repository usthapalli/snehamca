import React from 'react';
import './about.css';

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Delight Delivered 🍽️</h1>
      <p className="about-subtitle">Bringing joy to your doorstep, one bite at a time.</p>

      <section className="about-section">
        <h2>🌟 Our Story</h2>
        <p>
          Founded with a passion for food and technology, Delight Delivered is your go-to platform for fast, fresh, and flavorful meals. From local favorites to gourmet treats, we make sure every order is packed with care and delivered with a smile.
        </p>
      </section>

      <section className="about-section">
        <h2>🎯 Our Mission</h2>
        <p>
          To create memorable food experiences by connecting people with the best restaurants, freshest ingredients, and joyful service. We believe food should be more than just fuel—it should be a celebration.
        </p>
      </section>

      <section className="about-section">
        <h2>💖 Why People Love Us</h2>
        <ul>
          <li>🚀 Lightning-fast delivery</li>
          <li>🥗 Curated menus for every mood</li>
          <li>🎉 Delightful UI with confetti, balloons & more</li>
          <li>🔒 Secure payments & real-time tracking</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Delight Delivered. All rights reserved.</p>
          <div className="footer-links">
            <a href="/about">About Us</a>
            <a href="/contactus">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;