import React, { useState } from 'react';
import API from '../api';
import './RegisterModal.css'; // Ensure this file exists for styling

const RegisterModal = ({ show, onClose, toggleToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', { email, password });
      alert('Registration successful! Please log in.');
      toggleToLogin(); // Switch to login modal after successful registration
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div id="register-form">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Register</h2>

        <div className="form-group">
          <label htmlFor="register-email">Email</label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="register-password">Password</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn" onClick={handleRegister}>Register</button>

        <div className="toggle-link" onClick={toggleToLogin}>
          Already have an account? Login here
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
