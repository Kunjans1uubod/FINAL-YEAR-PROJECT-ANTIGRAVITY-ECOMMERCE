import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { Trash2, Minus, Plus } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1, selectedSize: 'M' },
    { ...products[4], quantity: 2, selectedSize: 'S' }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="cart-page page-transition-enter-active">
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-serif)', marginBottom: '2rem', fontSize: '2.5rem' }}>Shopping Bag</h1>
        
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>Your bag is currently empty.</p>
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </Link>
                  <div className="cart-item-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="cart-item-title">{item.name}</h3>
                      </Link>
                      <button onClick={() => removeItem(item.id)} style={{ color: 'var(--secondary)' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <p style={{ color: 'var(--secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>Size: {item.selectedSize}</p>
                    
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                      <span style={{ fontSize: '0.875rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row summary-total" style={{ marginTop: '1rem' }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
