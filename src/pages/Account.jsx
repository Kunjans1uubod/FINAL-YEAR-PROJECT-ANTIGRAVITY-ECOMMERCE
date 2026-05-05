import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="page-transition-enter-active auth-container-wrapper">
      <div className="auth-container">
        <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
        
        <form onSubmit={(e) => { e.preventDefault(); alert(isLogin ? 'Logged in successfully' : 'Account created'); window.location.href='/'; }}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" required />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: 'var(--secondary)', fontSize: '0.875rem', textDecoration: 'underline' }}
          >
            {isLogin ? "Don't have an account? Create one." : "Already have an account? Sign in."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
