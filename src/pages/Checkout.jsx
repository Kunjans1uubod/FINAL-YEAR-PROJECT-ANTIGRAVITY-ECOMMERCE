import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <div className="page-transition-enter-active" style={{ paddingTop: 'calc(80px + var(--spacing-lg))', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Checkout</h1>
        
        <div style={{ backgroundColor: 'var(--surface)', padding: '2rem' }}>
          <form onSubmit={(e) => { e.preventDefault(); alert('Order placed successfully!'); window.location.href='/'; }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Shipping Information</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" required />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" required />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input type="text" required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>City</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input type="text" required />
              </div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: '2rem 0 1.5rem' }}>Payment</h3>
            
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="XXXX XXXX XXXX XXXX" required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <label>CVC</label>
                <input type="text" placeholder="123" required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem' }}>
              Place Order
            </button>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Link to="/cart" style={{ color: 'var(--secondary)', fontSize: '0.875rem', textDecoration: 'underline' }}>Return to Cart</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
