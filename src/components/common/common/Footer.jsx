import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section brand">
            <Link to="/" className="footer-logo">
              <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="DANDY DUDES Logo" />
              <span className="footer-brand-text">DANDY DUDES</span>
            </Link>
            <p>Elegant accessories for the modern gentleman and lady. Quality, style, and sophistication.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="footer-section links">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/category/mens-watches">Men's Watches</Link></li>
              <li><Link to="/category/womens-watches">Women's Watches</Link></li>
              <li><Link to="/category/wallets">Wallets</Link></li>
              <li><Link to="/category/glasses">Glasses</Link></li>
            </ul>
          </div>

          <div className="footer-section links">
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
              <li><Link to="/warranty">Warranty</Link></li>
            </ul>
          </div>

          <div className="footer-section links">
            <h3>About</h3>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DANDY DUDES. All Rights Reserved.</p>
          <div className="payment-methods">
            {/* You can add payment method icons here later */}
            <span>We accept:</span>
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-amex"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;