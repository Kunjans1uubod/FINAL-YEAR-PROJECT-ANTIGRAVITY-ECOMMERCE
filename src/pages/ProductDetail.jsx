import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Heart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center', height: '100vh' }}>
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>Back Home</Link>
      </div>
    );
  }

  return (
    <div className="product-detail page-transition-enter-active">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-detail-images">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-info animate-fade-in">
            <h1 style={{ fontFamily: 'var(--font-serif)' }}>{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-desc">{product.description}</p>
            
            <div className="size-selector">
              <h3>Select Size {selectedSize && <span style={{color: 'var(--secondary)', textTransform:'none'}}>({selectedSize})</span>}</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="add-to-cart-wrapper">
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  if(!selectedSize) alert('Please select a size');
                  else alert('Added to cart!');
                }}
              >
                Add to Cart
              </button>
              <button className="btn btn-outline" style={{ flex: '0 0 auto', width: 'auto' }}>
                <Heart size={20} />
              </button>
            </div>
            
            <div style={{ marginTop: '3rem', borderTop: '1px solid var(--accent)', paddingTop: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Details</h4>
                <ul style={{ color: 'var(--secondary)', fontSize: '0.875rem', paddingLeft: '1rem' }}>
                  <li>Premium quality materials</li>
                  <li>Ethically sourced</li>
                  <li>Machine washable (delicate cycle)</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Shipping</h4>
                <p style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>Free standard shipping on orders over $150. Delivery within 3-5 business days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
