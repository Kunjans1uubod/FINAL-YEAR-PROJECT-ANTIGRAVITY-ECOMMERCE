import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Women = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  const womenProducts = products.filter(p => p.category === 'women');
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = womenProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(womenProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-transition-enter-active">
      <div className="category-header">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Women's Collection</h1>
          <p style={{ color: 'var(--secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Discover effortless elegance. Our women's collection features sophisticated pieces that blend modern comfort with timeless style.
          </p>
        </div>
      </div>
      
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="product-grid">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', gap: '0.5rem' }}>
              <button 
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ padding: '0.5rem 1rem', border: '1px solid var(--accent)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid',
                    borderColor: currentPage === index + 1 ? 'var(--primary)' : 'var(--accent)',
                    backgroundColor: currentPage === index + 1 ? 'var(--primary)' : 'transparent',
                    color: currentPage === index + 1 ? 'var(--background)' : 'var(--primary)',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ padding: '0.5rem 1rem', border: '1px solid var(--accent)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Women;
