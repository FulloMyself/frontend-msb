import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function LoginModal({ show, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      if (res.data.user.role === 'user') navigate('/user-dashboard');
      else navigate('/admin-dashboard');

      onClose(); // close modal after successful login
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
