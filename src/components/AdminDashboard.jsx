import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './AdminDashboard.css';

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

  const token = localStorage.getItem('token'); // admin auth token if needed

  const switchTab = (tab) => setActiveTab(tab);

  // ==========================
  // FETCH DATA
  // ==========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, loansRes, docsRes] = await Promise.all([
          axios.get('/api/users', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/loans', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/documents', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setUsers(usersRes.data);
        setLoans(loansRes.data);
        setDocuments(docsRes.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    };

    fetchData();
  }, [token]);

  // ==========================
  // UPDATE LOAN STATUS
  // ==========================
  const updateLoanStatus = async (loanId, newStatus) => {
    try {
      const res = await axios.patch(
        `/api/loan/${loanId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoans((prev) =>
        prev.map((loan) => (loan._id === loanId ? res.data.loan : loan))
      );
    } catch (err) {
      console.error('Error updating loan status:', err);
    }
  };

  // ==========================
  // UPDATE DOCUMENT STATUS
  // ==========================
  const updateDocumentStatus = async (docId, newStatus) => {
    try {
      const res = await axios.patch(
        `/api/document/${docId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDocuments((prev) =>
        prev.map((doc) => (doc._id === docId ? res.data.document : doc))
      );
    } catch (err) {
      console.error('Error updating document status:', err);
    }
  };

  // ==========================
  // RENDER
  // ==========================
  return (
    <div id="admin-dashboard" className="dashboard">
      {/* Navbar */}
      <div className="nav-bar">
        <h2>Admin Dashboard</h2>
        <div>
          <span className="user-info" id="admin-name-display">Admin User</span>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              window.location.href = '#/';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{users.length}</div>
          <div>Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{loans.filter(l => l.status === 'pending').length}</div>
          <div>Pending Loans</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">R{loans.reduce((sum, l) => sum + l.amount, 0)}</div>
          <div>Total Loan Amount</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => switchTab('users')}>Users</button>
        <button className={`tab ${activeTab === 'loans' ? 'active' : ''}`} onClick={() => switchTab('loans')}>Loan Applications</button>
        <button className={`tab ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => switchTab('documents')}>Documents</button>
      </div>

      {/* Tab Content */}
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
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.idNumber}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
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
                    <td><span className={`status-badge status-${loan.status.replace(' ', '-')}`}>{loan.status}</span></td>
                    <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select value={loan.status} onChange={(e) => updateLoanStatus(loan._id, e.target.value)} style={{ marginLeft: '10px', padding: '5px' }}>
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
                    <td><span className={`status-badge status-${doc.status.replace(' ', '-')}`}>{doc.status}</span></td>
                    <td>
                      <select value={doc.status} onChange={(e) => updateDocumentStatus(doc._id, e.target.value)} style={{ marginLeft: '10px', padding: '5px' }}>
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
