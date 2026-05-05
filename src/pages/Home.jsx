import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  const testimonials = [
    {
      id: 1,
      name: "Anamol Chapagain",
      review: "Absolutely love the minimalist aesthetic. The quality of the fabric is exceptional and fits perfectly.",
      role: "Verified Buyer"
    },
    {
      id: 2,
      name: "Jenuine Karki",
      review: "Aura has completely transformed my wardrobe. Essential pieces that look premium and feel incredibly comfortable.",
      role: "Verified Buyer"
    },
    {
      id: 3,
      name: "Saugat Thapa",
      review: "Fast shipping and stunning packaging. The silk slip dress is my new go-to for evening events.",
      role: "Verified Buyer"
    },
    {
      id: 4,
      name: "Safar Thapa",
      review: "The overcoat is a masterpiece. I've received countless compliments. Highly recommend to anyone looking for timeless style.",
      role: "Verified Buyer"
    }
  ];

  return (
    <div className="page-transition-enter-active">
      {/* Video Hero Section */}
      <section className="hero">
        <video 
          className="hero-bg" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="https://www.pexels.com/download/video/8387363/" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', width: '100%', zIndex: 10 }}>
          <div className="hero-content animate-fade-in">
            <span className="hero-subtitle">The New Standard</span>
            <h1 className="heading-hero" style={{ marginBottom: '1.5rem' }}>Elegance, Redefined.</h1>
            <p className="hero-desc">Discover our latest arrivals featuring minimalist silhouettes and premium fabrics designed for the modern lifestyle.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/women" target="_blank" rel="noopener noreferrer" className="btn btn-primary hero-btn">Shop Women</Link>
              <Link to="/men" target="_blank" rel="noopener noreferrer" className="btn btn-outline hero-btn-outline">Shop Men</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="fade-in-section">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-section">Trending Now</h2>
            <Link to="/women" target="_blank" rel="noopener noreferrer" className="view-all-link">View All</Link>
          </div>
          <div className="product-grid">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-section fade-in-section">
        <div className="promo-grid">
          <div className="promo-img-container">
             <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Core Collection" className="promo-img"/>
          </div>
          <div className="promo-content">
            <div style={{ maxWidth: '450px' }}>
              <h2 className="promo-title">The Core Collection</h2>
              <p className="promo-text">Elevate your everyday wardrobe with our carefully curated core essentials. Versatile pieces that transcend seasons.</p>
              <Link to="/women" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1.25rem 3rem' }}>Explore The Collection</Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="fade-in-section">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-section">New Arrivals</h2>
            <Link to="/men" target="_blank" rel="noopener noreferrer" className="view-all-link">View All</Link>
          </div>
          <div className="product-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section fade-in-section">
        <div className="container">
          <h2 className="heading-section" style={{ textAlign: 'center', marginBottom: '4rem' }}>What They Say</h2>
          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p className="testimonial-review">"{t.review}"</p>
                <div className="testimonial-author">
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
