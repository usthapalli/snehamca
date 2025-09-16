import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("Please enter something to search.");
      return;
    }
    navigate(`/search/${searchTerm}`);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Delight Delivered 🍽️</h1>
          <p>Your favorite meals, delivered fast & fresh.</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for restaurants or dishes..."
              className="search-bar-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <img
          src="/image/delicious.jpg"
          alt="Delicious food"
          className="hero-img"
        />
      </section>

      {/* Quote of the Day */}
      <section className="quote-section">
        <p className="daily-quote">“Life is uncertain. Eat dessert first.” 🍰</p>
      </section>

      {/* Categories */}
      <section className="category-grid">
        <Link to="/veg" className="category-card veg">🥦 Veg</Link>
        <Link to="/nonveg" className="category-card nonveg">🍗 NonVeg</Link>
        <Link to="/milk" className="category-card milk">🥛 Milk</Link>
        <Link to="/chocolate" className="category-card chocolate">🍫 Chocolate</Link>
        <Link to="/snacks" className="category-card snacks">🍟 Snacks</Link>
        <Link to="/icecream" className="category-card icecream">🍨 Ice Cream</Link>
      </section>

      {/* Popular Picks */}
      <section className="popular-section">
        <h2 className="section-title">Popular Picks</h2>
        <div className="popular-grid">
          <div className="item-card">
            <div className="item-img-wrapper">
              <img src="image/hyderabadbiriyani.webp" alt="HyderabadBiriyani" />
              <span className="item-tag">Bestseller</span>
            </div>
            <h3>Chocolate Delight</h3>
            <p>Rich, creamy, and loved by all.</p>
            <div className="item-meta">
              <span className="item-price">₹199</span>
              <span className="item-rating">⭐️⭐️⭐️⭐️⭐️</span>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="item-card">
            <div className="item-img-wrapper">
              <img src="image/ninjaM.jpg" alt="Fresh Milk" />
              <span className="item-tag">Fresh</span>
            </div>
            <h3>Fresh Milk</h3>
            <p>Farm-fresh and nutrient-rich.</p>
            <div className="item-meta">
              <span className="item-price">₹89</span>
              <span className="item-rating">⭐️⭐️⭐️⭐️</span>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="item-card">
            <div className="item-img-wrapper">
              <img src="image/cucumber.jpeg" alt="Organic Veggies" />
              <span className="item-tag">Organic</span>
            </div>
            <h3>Organic Veggies</h3>
            <p>Locally sourced and pesticide-free.</p>
            <div className="item-meta">
              <span className="item-price">₹149</span>
              <span className="item-rating">⭐️⭐️⭐️⭐️</span>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="item-card">
            <div className="item-img-wrapper">
              <img src="image/hersheys.webp" alt="Choco Milk Combo" />
              <span className="item-tag">Combo</span>
            </div>
            <h3>Choco Milk Combo</h3>
            <p>Perfect pair for sweet cravings.</p>
            <div className="item-meta">
              <span className="item-price">₹259</span>
              <span className="item-rating">⭐️⭐️⭐️⭐️⭐️</span>
            </div>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button
        className="fab"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ⬆️
      </button>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Delight Delivered. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
