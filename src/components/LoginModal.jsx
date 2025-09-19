import React, { useState } from 'react';
import API from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import './LoginModal.css';

const LoginModal = ({ show, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
// store token and role
localStorage.setItem('token', res.data.token);
localStorage.setItem('role', res.data.user.role);


      if (res.data.user.role === 'user') window.location.href = '#/user-dashboard';
      else window.location.href = '#/admin-dashboard';
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return alert('Passwords do not match!');
    }
    try {
      await API.post('/auth/register', { name, email, password, phone });

      alert('Registration successful, please login!');
      setIsRegister(false);
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
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
              <button className="btn login-btn" onClick={handleLogin}>Login</button>
              <div className="register-link">
                <span>Don't have an account? </span>
                <button className="toggle-register-btn" onClick={() => setIsRegister(true)}>
                  Register here
                </button>
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
                <label htmlFor="register-name">Full Name</label>
                <input
                  type="text"
                  id="register-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-email">Email</label>
                <input
                  type="email"
                  id="register-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-confirm">Confirm Password</label>
                <input
                  type="password"
                  id="register-confirm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button className="btn register-btn" onClick={handleRegister}>Register</button>
              <div className="login-link">
                <span>Already have an account? </span>
                <button className="toggle-login-btn" onClick={() => setIsRegister(false)}>
                  Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginModal;
