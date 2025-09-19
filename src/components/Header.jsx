import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <nav className="container">
        <div className="logo">EstablishedLoans</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">How It Works</a></li>
          <li><a href="#requirements">Requirements</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
      </nav>
    </header>
  );
}

export default Header;
