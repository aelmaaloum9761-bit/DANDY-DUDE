import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInquiry } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useDebounce } from '../../hooks/useDebounce';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getInquiryCount } = useInquiry(); // <-- 2. Use the new hook
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ... (keep the existing search logic)
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, navigate]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="DANDY DUDES Logo" />
            <span className="logo-text">DANDY DUDES</span>
          </Link>

          {/* Main Navigation (Desktop) */}
          <nav className="main-nav">
            <ul>
              <li><Link to="/category/mens-watches">Men's Watches</Link></li>
              <li><Link to="/category/womens-watches">Women's Watches</Link></li>
              <li><Link to="/category/wallets">Wallets</Link></li>
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
            
            <div className="user-menu">
              {user ? (
                <div className="user-logged-in">
                  <span>Hi, {user.name}</span>
                  <div className="user-dropdown">
                    <Link to="/account">My Account</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="login-link">Login</Link>
              )}
            </div>

            {/* 3. Update the link, icon, and count */}
            <Link to="/inquiry" className="cart-link" aria-label="View your inquiry list">
              <i className="fas fa-clipboard-list"></i> {/* Changed icon to a clipboard/list */}
              <span className="cart-count">{getInquiryCount()}</span> {/* Uses new count function */}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-open' : ''}`}>
          <ul>
            <li><Link to="/category/mens-watches" onClick={toggleMobileMenu}>Men's Watches</Link></li>
            <li><Link to="/category/womens-watches" onClick={toggleMobileMenu}>Women's Watches</Link></li>
            <li><Link to="/category/wallets" onClick={toggleMobileMenu}>Wallets</Link></li>
            <li><Link to="/account" onClick={toggleMobileMenu}>My Account</Link></li>
            <li><Link to="/contact" onClick={toggleMobileMenu}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;