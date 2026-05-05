import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useShop } from '../contexts/ShopContext';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cartItems } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled || location.pathname !== '/' ? 'scrolled' : ''}`}>
      <div className="nav-links">
        <Link to="/women" target="_blank" rel="noopener noreferrer">Women</Link>
        <Link to="/men" target="_blank" rel="noopener noreferrer">Men</Link>
      </div>

      <div className="logo" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: '700', letterSpacing: '0.1em' }}>
        <Link to="/">AURA</Link>
      </div>

      <div className="nav-icons">
        <button><Search size={20} /></button>
        <Link to="/account"><User size={20} /></Link>
        <Link to="/cart" style={{ position: 'relative' }}>
          <ShoppingBag size={20} />
          {cartItems?.length > 0 && <span className="cart-count">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
