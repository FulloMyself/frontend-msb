import React, { useState } from 'react';

const Hero = () => {
  const [amount, setAmount] = useState(5000);

  const handleSliderChange = (e) => setAmount(parseInt(e.target.value));
  const handleApplyClick = () => alert('Redirecting to secure application form...');

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="rating-badge">
              <span className="rating-stars">⭐⭐⭐⭐⭐</span>
              <span>4.8/5 from 2,500+ reviews</span>
            </div>
            <h1>Get Your Loan Approved in Minutes</h1>
            <p>
              Fast, secure, and hassle-free personal loans up to R15,000. Same-day funding
              available with competitive rates and flexible terms.
            </p>
          </div>

          <div className="calculator-card">
            <div className="calculator-header">
              <h3>Quick Loan Calculator</h3>
              <p>5 minutes is all you need to apply</p>
            </div>

            <div className="amount-display">R{amount.toLocaleString()}</div>

            <div className="slider-container">
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={amount}
                onChange={handleSliderChange}
                className="slider"
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.9rem',
                  color: '#666',
                  marginTop: '0.5rem',
                }}
              >
                <span>R1,000</span>
                <span>R15,000</span>
              </div>
            </div>

            <button className="apply-btn" onClick={handleApplyClick}>
              Apply Now - Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
