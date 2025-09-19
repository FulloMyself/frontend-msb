import React, { useState, useEffect } from 'react';
import API from '../api';
import './UserDashboard.css';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('apply-loan');

  // Loan form state
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [repaymentPeriod, setRepaymentPeriod] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [loanReason, setLoanReason] = useState('');

  // User info & documents
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState({
    idCopy: null,
    payslip: null,
    proofOfResidence: null,
    bankStatement: null,
  });

  // My loans
  const [myLoans, setMyLoans] = useState([]);

  const token = localStorage.getItem('token');

  const handleTabClick = (tab) => setActiveTab(tab);

  // Fetch user info
  const fetchUser = async () => {
    try {
      const res = await API.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error('Failed to fetch user:', err.response?.data || err.message);
    }
  };

  // Fetch user's loans
  const fetchLoans = async () => {
    try {
      const res = await API.get('/loans/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyLoans(res.data.loans);
    } catch (err) {
      console.error('Failed to fetch loans:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchLoans();
    }
  }, [token]);

  // Apply for a loan
  const applyLoan = async () => {
    if (!loanAmount || !loanPurpose || !repaymentPeriod || !monthlyIncome) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      await API.post(
        '/loans/apply',
        {
          amount: loanAmount,
          purpose: loanPurpose,
          repaymentPeriod,
          monthlyIncome,
          additionalInfo: loanReason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Loan application submitted successfully!');
      setLoanAmount('');
      setLoanPurpose('');
      setRepaymentPeriod('');
      setMonthlyIncome('');
      setLoanReason('');
      fetchLoans();
    } catch (err) {
      alert('Failed to submit loan: ' + (err.response?.data?.message || err.message));
    }
  };

  // Handle file selection
  const handleFileChange = (e, type) => {
    setDocuments({ ...documents, [type]: e.target.files[0] });
  };

  // Upload document
  const uploadDocument = async (type) => {
    if (!documents[type]) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append(type, documents[type]);

    try {
      const res = await API.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });

      alert(`${type} uploaded successfully!`);

      // Update user documents
      setUser((prev) => ({
        ...prev,
        documents: res.data.documents,
      }));

      // Clear selected file
      setDocuments({ ...documents, [type]: null });
    } catch (err) {
      alert('Failed to upload document: ' + (err.response?.data?.message || err.message));
    }
  };

  if (!user) return <div>Loading dashboard...</div>;

  const docTypes = ['idCopy', 'payslip', 'proofOfResidence', 'bankStatement'];

  return (
    <div id="user-dashboard" className="card dashboard">
      {/* Navbar */}
      <div className="nav-bar">
        <h2>User Dashboard</h2>
        <div>
          <div className="user-info">
            <strong>{user.name}</strong> <br />
            <small>{user.email}</small>
          </div>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
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
          <div className="stat-number">{myLoans.length}</div>
          <div>Total Loan Applications</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {user.documents
              ? Object.values(user.documents)
                  .flat()
                  .filter(Boolean).length
              : 0}
          </div>
          <div>Uploaded Documents</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">R{myLoans.reduce((sum, l) => sum + l.amount, 0)}</div>
          <div>Total Applied</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'apply-loan' ? 'active' : ''}`} onClick={() => handleTabClick('apply-loan')}>
          Apply for Loan
        </button>
        <button className={`tab ${activeTab === 'my-loans' ? 'active' : ''}`} onClick={() => handleTabClick('my-loans')}>
          My Loans
        </button>
        <button className={`tab ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => handleTabClick('documents')}>
          Documents
        </button>
      </div>

      {/* Apply Loan Tab */}
      {activeTab === 'apply-loan' && (
        <div className="tab-content active">
          <h3>Apply for a New Loan</h3>
          <div className="loan-form">
            <div className="form-group">
              <label htmlFor="loan-amount">Loan Amount (R300 - R4,000)</label>
              <input type="number" id="loan-amount" min="300" max="4000" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="loan-purpose">Loan Purpose</label>
              <select id="loan-purpose" value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value)}>
                <option value="">Select Purpose</option>
                <option value="emergency">Emergency</option>
                <option value="education">Education</option>
                <option value="medical">Medical</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="repayment-period">Repayment Period (months)</label>
              <select id="repayment-period" value={repaymentPeriod} onChange={(e) => setRepaymentPeriod(e.target.value)}>
                <option value="">Select Period</option>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="monthly-income">Monthly Income</label>
              <input type="number" id="monthly-income" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="loan-reason">Additional Information</label>
              <textarea id="loan-reason" rows="3" placeholder="Additional details..." value={loanReason} onChange={(e) => setLoanReason(e.target.value)} />
            </div>
          </div>
          <button className="btn" onClick={applyLoan}>Submit Loan Application</button>
        </div>
      )}

      {/* My Loans Tab */}
      {activeTab === 'my-loans' && (
        <div className="tab-content">
          <h3>My Loan Applications</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Period</th>
                <th>Status</th>
                <th>Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {myLoans.length === 0 ? (
                <tr><td colSpan="5">No loan applications found.</td></tr>
              ) : (
                myLoans.map((loan) => (
                  <tr key={loan._id}>
                    <td>R{loan.amount}</td>
                    <td>{loan.purpose}</td>
                    <td>{loan.repaymentPeriod} months</td>
                    <td>{loan.status}</td>
                    <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="tab-content">
          <h3>Upload Required Documents</h3>
          <p>Please upload all required documents to process your loan application:</p>

          {docTypes.map((doc) => (
            <div key={doc} className="document-upload">
              <div className="upload-area">
                <strong>{doc.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</strong><br />
                <input
                  type="file"
                  id={doc}
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, doc)}
                />
                <button className="btn" onClick={() => document.getElementById(doc).click()}>Select File</button>
                <button className="btn" style={{ marginLeft: '5px' }} onClick={() => uploadDocument(doc)}>Upload</button>

                {user.documents && user.documents[doc] && (
                  <>
                    {Array.isArray(user.documents[doc])
                      ? user.documents[doc].map((f, idx) => <div key={idx} className="uploaded-file">Uploaded: {f}</div>)
                      : <div className="uploaded-file">Uploaded: {user.documents[doc]}</div>
                    }
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
