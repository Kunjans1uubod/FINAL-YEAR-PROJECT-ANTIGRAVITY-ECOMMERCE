import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>About Aura</h4>
            <p style={{ color: '#AAAAAA', fontSize: '0.875rem' }}>
              We create minimalist, premium fashion designed for longevity. Discover our modern approach to everyday essentials.
            </p>
          </div>
          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AURA FASHION. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
