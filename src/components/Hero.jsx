import React, { useState } from 'react';

function Hero() {
  const [amount, setAmount] = useState(5000);

  const handleSliderChange = (e) => setAmount(parseInt(e.target.value, 10));

  const handleApplyClick = () => {
    // Ideally redirect to a form page or open modal
    alert('Redirecting to secure application form...');
  };

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          
          {/* Hero Text */}
          <div className="hero-text" style={{ flex: '1 1 400px' }}>
            <div className="rating-badge" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="rating-stars">⭐⭐⭐⭐⭐</span>
              <span>4.8/5 from 2,500+ reviews</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get Your Loan Approved in Minutes</h1>
            <p>Fast, secure, and hassle-free personal loans up to R15,000. Same-day funding available with competitive rates and flexible terms.</p>
          </div>

          {/* Calculator Card */}
          <div className="calculator-card" style={{ flex: '1 1 300px', padding: '2rem', borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <div className="calculator-header" style={{ marginBottom: '1rem', textAlign: 'center' }}>
              <h3>Quick Loan Calculator</h3>
              <p>5 minutes is all you need to apply</p>
            </div>

            <div className="amount-display" style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0', textAlign: 'center' }}>
              R{amount.toLocaleString()}
            </div>

            <div className="slider-container">
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={amount}
                onChange={handleSliderChange}
                className="slider"
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                <span>R1,000</span>
                <span>R15,000</span>
              </div>
            </div>

            <button
              className="apply-btn"
              onClick={handleApplyClick}
              style={{ width: '100%', marginTop: '1rem', padding: '1rem', borderRadius: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
            >
              Apply Now - Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
