// frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import API from '../api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [documents, setDocuments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };

    API.get('/admin/users', { headers })
      .then(res => setUsers(res.data.users || []))
      .catch(err => {
        console.error('Error fetching admin users:', err);
        setUsers([]);
      });

    API.get('/admin/loans', { headers })
      .then(res => setLoans(res.data.loans || []))
      .catch(err => {
        console.error('Error fetching admin loans:', err);
        setLoans([]);
      });

    API.get('/admin/documents', { headers })
      .then(res => setDocuments(res.data.documents || []))
      .catch(err => {
        console.error('Error fetching admin documents:', err);
        setDocuments([]);
      });
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '#/';
  };

  return (
    <div id="admin-dashboard" className="dashboard">
      <div className="nav-bar">
        <h2>Admin Dashboard</h2>
        <div>
          <span className="user-info">Admin</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-number">{users.length}</div><div>Total Users</div></div>
        <div className="stat-card"><div className="stat-number">{loans.filter(l => l.status === 'pending').length}</div><div>Pending Loans</div></div>
        <div className="stat-card"><div className="stat-number">R{loans.reduce((s, l) => s + (l.amount || 0), 0)}</div><div>Total Loan Amount</div></div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
        <button className={`tab ${activeTab === 'loans' ? 'active' : ''}`} onClick={() => setActiveTab('loans')}>Loan Applications</button>
        <button className={`tab ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => setActiveTab('documents')}>Documents</button>
      </div>

      {activeTab === 'users' && (
        <div className="tab-content">
          <h3>All Users</h3>
          <table className="user-table">
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Registered</th><th>Actions</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || '-'}</td>
                  <td>{u.role}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td><button className="view-btn" onClick={() => alert(JSON.stringify(u, null, 2))}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'loans' && (
        <div className="tab-content">
          <h3>Loan Applications</h3>
          <table className="user-table">
            <thead><tr><th>User</th><th>Amount</th><th>Purpose</th><th>Period</th><th>Status</th><th>Date Applied</th><th>Actions</th></tr></thead>
            <tbody>
              {loans.map(l => (
                <tr key={l._id}>
                  <td>{l.user?.email || '—'}</td>
                  <td>R{l.amount}</td>
                  <td>{l.purpose}</td>
                  <td>{l.repaymentPeriod || '—'}</td>
                  <td>{l.status}</td>
                  <td>{new Date(l.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="view-btn" onClick={() => alert(JSON.stringify(l, null, 2))}>View</button>
                    <select onChange={(e) => {
                      const status = e.target.value;
                      API.post(`/admin/loans/${l._id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } })
                        .then(() => window.location.reload())
                        .catch(err => console.error('Failed to update loan status', err));
                    }} defaultValue={l.status}>
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
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="tab-content">
          <h3>User Documents</h3>
          <table className="user-table">
            <thead><tr><th>User</th><th>Type</th><th>URL</th><th>Actions</th></tr></thead>
            <tbody>
              {documents.map((d, i) => (
                <tr key={i}>
                  <td>{d.userEmail || d.user?.email}</td>
                  <td>{d.type}</td>
                  <td><a href={d.url} target="_blank" rel="noreferrer">View</a></td>
                  <td>
                    <select onChange={(e) => {
                      API.post(`/admin/documents/${d._id}/status`, { status: e.target.value }, { headers: { Authorization: `Bearer ${token}` }})
                        .then(() => window.location.reload())
                        .catch(err => console.error('Failed to update doc status', err));
                    }}>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
