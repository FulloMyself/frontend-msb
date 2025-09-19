import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterModal from './components/RegisterModal';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Optional: keep register route (though RegisterModal is meant for modals) */}
        <Route path="/register" element={<RegisterModal show={true} />} />

        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
        {/* fallback */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
