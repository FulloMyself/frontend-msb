import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminDashboard.css';
import axios from 'axios';

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingLoans: 0,
    totalLoanAmount: 0,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, loansRes, docsRes] = await Promise.all([
        axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/admin/loans', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/admin/documents', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setUsers(usersRes.data.users);
      setLoans(loansRes.data.loans);
      setDocuments(docsRes.data.documents);

      setStats({
        totalUsers: usersRes.data.users.length,
        pendingLoans: loansRes.data.loans.filter(l => l.status === 'pending').length,
        totalLoanAmount: loansRes.data.loans.reduce((sum, l) => sum + l.amount, 0),
      });
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  const switchTab = (tab) => setActiveTab(tab);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '#/';
  };

  const updateLoanStatus = async (loanId, status) => {
    try {
      await axios.patch(`/api/admin/loans/${loanId}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      fetchData(); // refresh data
    } catch (err) {
      console.error(err);
    }
  };

  const updateDocumentStatus = async (docId, status) => {
    try {
      await axios.patch(`/api/admin/documents/${docId}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      fetchData(); // refresh data
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="admin-dashboard" className="dashboard">
      {/* Navbar */}
      <div className="nav-bar">
        <h2>Admin Dashboard</h2>
        <div>
          <span className="user-info" id="admin-name-display">Admin User</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number" id="total-users">{stats.totalUsers}</div>
          <div>Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" id="pending-loans">{stats.pendingLoans}</div>
          <div>Pending Loans</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" id="total-loan-amount">R{stats.totalLoanAmount}</div>
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
          <motion.div key="users" className="tab-content" variants={tabVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
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
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.idNumber}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td><button className="view-btn" onClick={() => alert(`View ${user.name}`)}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'loans' && (
          <motion.div key="loans" className="tab-content" variants={tabVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
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
                {loans.map(loan => (
                  <tr key={loan._id}>
                    <td>{loan.userName}</td>
                    <td>R{loan.amount}</td>
                    <td>{loan.purpose}</td>
                    <td>{loan.period}</td>
                    <td><span className={`status-badge status-${loan.status}`}>{loan.status}</span></td>
                    <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="view-btn" onClick={() => alert(`View ${loan.userName}'s loan`)}>View</button>
                      <select
                        value={loan.status}
                        onChange={(e) => updateLoanStatus(loan._id, e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="under-review">Under Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'documents' && (
          <motion.div key="documents" className="tab-content" variants={tabVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
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
                {documents.map(doc => (
                  <tr key={doc._id}>
                    <td>{doc.userName}</td>
                    <td>{doc.type}</td>
                    <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                    <td><span className={`status-badge status-${doc.status}`}>{doc.status}</span></td>
                    <td>
                      <button className="view-btn" onClick={() => window.open(doc.url, '_blank')}>View</button>
                      <select
                        value={doc.status}
                        onChange={(e) => updateDocumentStatus(doc._id, e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
