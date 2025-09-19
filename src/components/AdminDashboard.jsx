import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminDashboard.css';

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('documents');

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div id="admin-dashboard" className="dashboard">
      {/* Navbar */}
      <div className="nav-bar">
        <h2>Admin Dashboard</h2>
        <div>
          <span className="user-info" id="admin-name-display">Admin User</span>
          <button className="logout-btn" onClick={() => alert('Logout functionality here')}>Logout</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number" id="total-users">1</div>
          <div>Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" id="pending-loans">0</div>
          <div>Pending Loans</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" id="total-loan-amount">R1500</div>
          <div>Total Loan Amount</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => switchTab('users')}>Users</button>
        <button className={`tab ${activeTab === 'loans' ? 'active' : ''}`} onClick={() => switchTab('loans')}>Loan Applications</button>
        <button className={`tab ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => switchTab('documents')}>Documents</button>
      </div>

      {/* Tab Content with Animations */}
      <AnimatePresence exitBeforeEnter>
        {activeTab === 'users' && (
          <motion.div
            key="users"
            className="tab-content"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h3>All Users</h3>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>ID Number</th>
                  <th>Registration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>0123456789</td>
                  <td>9001010001000</td>
                  <td>2025-09-19</td>
                  <td>
                    <button className="view-btn" onClick={() => alert('View User 1')}>View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'loans' && (
          <motion.div
            key="loans"
            className="tab-content"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h3>Loan Applications</h3>
            <table className="user-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Purpose</th>
                  <th>Period</th>
                  <th>Status</th>
                  <th>Date Applied</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>R1500</td>
                  <td>emergency</td>
                  <td>6 months</td>
                  <td><span className="status-badge status-under-review">under-review</span></td>
                  <td>2025-09-15</td>
                  <td>
                    <button className="view-btn" onClick={() => alert('View Loan 1')}>View</button>
                    <select onChange={(e) => alert(`Update Loan 1 status to ${e.target.value}`)} style={{ marginLeft: '10px', padding: '5px' }}>
                      <option value="pending">Pending</option>
                      <option value="under-review" selected>Under Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'documents' && (
          <motion.div
            key="documents"
            className="tab-content"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h3>User Documents</h3>
            <table className="user-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Document Type</th>
                  <th>Upload Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>Certified ID Copy</td>
                  <td>2025-09-16</td>
                  <td><span className="status-badge status-pending">pending</span></td>
                  <td>
                    <button className="view-btn" onClick={() => alert('View Document john_id_copy.pdf')}>View</button>
                    <select onChange={(e) => alert(`Update Document 1 status to ${e.target.value}`)} style={{ marginLeft: '10px', padding: '5px' }}>
                      <option value="pending" selected>Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
