// 📦 Core & Routing
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 🎨 Icons
import {
  FaHome, FaCarrot, FaDrumstickBite, FaGlassWhiskey, FaShoppingCart,
  FaInfoCircle, FaEnvelope, FaClipboardList, FaUserPlus, FaUser
} from 'react-icons/fa';
import { GiChocolateBar } from 'react-icons/gi';

// 🧩 Pages & Components
import Home from './Home';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Chocolate from './Chocolate'; // ✅ Corrected spelling
import Milk from './Milk';
import Signup from './Signup';
import Cart from './Cart'; // ✅ Ensure Cart.jsx exists and is correctly named
import About from './About';
import OrdersHistory from './OrdersHistory';
import ContactUs from './ContactUs';
import Login from './Login';
import SearchResults from './SearchResults';

// 🧼 Styles
import './App.css';

function App() {
  const navigate = useNavigate();

  // 🛒 Cart logic
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || item.Quantity || 0),
    0
  );

  // 🔍 Search & Auth
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  // 🧠 Effects
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) setLoggedInUser(user);
  }, []);

  // 🔎 Search Handler
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter something to search.');
      return;
    }
    navigate(`/search/${searchQuery}`);
  };

  // 🚪 Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    navigate('/login');
  };

  return (
    <>
      {/* 🧭 Navigation Bar */}
      <header className="navbar">
        <div className="navbar-top">
          <Link to="/home" className="logo">
            🧺 <span className="brand-name">SnapBasket</span>
          </Link>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>
        </div>

        <nav>
          <NavLink to="/home"><FaHome /> Home</NavLink>
          <NavLink to="/veg"><FaCarrot /> Veg</NavLink>
          <NavLink to="/nonveg"><FaDrumstickBite /> NonVeg</NavLink>
          <NavLink to="/milk"><FaGlassWhiskey /> Milk</NavLink>
          <NavLink to="/chocolate"><GiChocolateBar /> Chocolate</NavLink>
          <NavLink to="/signup"><FaUserPlus /> Signup</NavLink>
          <NavLink to="/OrdersHistory"><FaClipboardList /> Orders</NavLink>
          <NavLink to="/ContactUs"><FaEnvelope /> ContactUs</NavLink>
          <NavLink to="/About"><FaInfoCircle /> About</NavLink>

          {loggedInUser ? (
            <>
              <span className="welcome-msg">👋 Welcome, {loggedInUser.name}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <NavLink to="/Login"><FaUser /> Login</NavLink>
          )}

          <NavLink to="/cart"><FaShoppingCart /> Cart ({cartCount})</NavLink>
        </nav>
      </header>

      {/* 🧭 Routes */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/chocolate" element={<Chocolate />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/OrdersHistory" element={<OrdersHistory />} />
          <Route path="/About" element={<About />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/cart"
            element={
              <div>
                <Cart searchQuery={searchQuery} />
                <OrdersHistory />
              </div>
            }
          />
          <Route path="/search/:term" element={<SearchResults />} />
        </Routes>
      </main>
    </>
  );
}

// 🌐 Wrap with Router
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}