import React from 'react';
import Hero from './Hero';

const LandingPage = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <nav className="container">
          <div className="logo">EstablishedLoans</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">How It Works</a></li>
            <li><a href="#requirements">Requirements</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="login-btn">Login</button>
        </nav>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose EstablishedLoans?</h2>
            <p>We make borrowing simple, fast, and transparent</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast Approval</h3>
              <p>Get approved in as little as 5 minutes with our streamlined application process and instant decision technology.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Transparent</h3>
              <p>Bank-level security protects your data. No hidden fees or surprise charges - we communicate all costs upfront.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Same-Day Funding</h3>
              <p>Once approved, funds can be deposited into your account as soon as the same business day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="requirements" id="requirements">
        <div className="container">
          <div className="requirements-content">
            <div>
              <h2>Simple Requirements</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#718096' }}>
                Our straightforward application process means you can get the funds you need quickly and easily.
              </p>

              <div className="requirements-list">
                <h3>What You Need to Apply</h3>
                <div className="requirement-item">
                  <div className="check-icon">✓</div>
                  <div>
                    <strong>Valid ID or Driver's License</strong><br />
                    <small>Government-issued photo identification</small>
                  </div>
                </div>
                <div className="requirement-item">
                  <div className="check-icon">✓</div>
                  <div>
                    <strong>Steady Income Source</strong><br />
                    <small>Employment or regular income verification</small>
                  </div>
                </div>
                <div className="requirement-item">
                  <div className="check-icon">✓</div>
                  <div>
                    <strong>Bank Account</strong><br />
                    <small>Active checking account for fund deposits</small>
                  </div>
                </div>
                <div className="requirement-item">
                  <div className="check-icon">✓</div>
                  <div>
                    <strong>Age 18 or Older</strong><br />
                    <small>Must be legal age in your state</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="requirements-list">
              <h3>How to Apply</h3>
              {[1, 2, 3, 4].map(step => (
                <div className="requirement-item" key={step}>
                  <div className="check-icon">{step}</div>
                  <div>
                    <strong>
                      {step === 1 && 'Choose Your Amount'}
                      {step === 2 && 'Complete Application'}
                      {step === 3 && 'Get Instant Decision'}
                      {step === 4 && 'Receive Your Funds'}
                    </strong>
                    <br />
                    <small>
                      {step === 1 && 'Select loan amount and terms that work for you'}
                      {step === 2 && 'Fill out our simple 5-minute online form'}
                      {step === 3 && 'Receive approval decision within minutes'}
                      {step === 4 && 'Money deposited as soon as same day'}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="container">
          <p>© 2025 EstablishedLoans. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
