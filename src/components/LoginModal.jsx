import React, { useState } from 'react';
import API from '../api';
import './LoginModal.css'; // Ensure this file exists for styling

const LoginModal = ({ show, onClose, toggleToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      if (res.data.user.role === 'user') window.location.href = '#/user-dashboard';
      else window.location.href = '#/admin-dashboard';

    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="modal-title">Login</h2>

        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button className="btn login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="register-link">
          <span>Don't have an account? </span>
          <button
            className="toggle-register-btn"
            onClick={() => {
              onClose(); // Close LoginModal
              toggleToRegister(); // Open RegisterModal
            }}
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
