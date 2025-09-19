import React, { useState } from 'react';
import API from '../api'; // make sure API.baseURL points to https://msb-backend-5km0.onrender.com
import { motion, AnimatePresence } from 'framer-motion';
import './LoginModal.css';

const LoginModal = ({ show, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --- LOGIN ---
  const handleLogin = async () => {
    try {
      const res = await API.post('/api/auth/login', { email, password });
      // store user info (token optional for now)
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('userName', res.data.user.name || '');
      localStorage.setItem('userId', res.data.user.id);

      // redirect based on role
      if (res.data.user.role === 'admin') window.location.href = '#/admin-dashboard';
      else window.location.href = '#/user-dashboard';
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.error || err.message));
    }
  };

  // --- REGISTER ---
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return alert('Passwords do not match!');
    }

    try {
      await API.post('/api/auth/register', { name, email, password });
      alert('Registration successful! Please login.');
      setIsRegister(false);
      // clear registration fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.error || err.message));
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <AnimatePresence mode="wait">
          {!isRegister ? (
            <motion.div
              key="login"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="modal-title">Login</h2>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button className="btn login-btn" onClick={handleLogin}>Login</button>
              <div className="register-link">
                <span>Don't have an account? </span>
                <button className="toggle-register-btn" onClick={() => setIsRegister(true)}>Register here</button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="modal-title">Register</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button className="btn register-btn" onClick={handleRegister}>Register</button>
              <div className="login-link">
                <span>Already have an account? </span>
                <button className="toggle-login-btn" onClick={() => setIsRegister(false)}>Login</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginModal;
