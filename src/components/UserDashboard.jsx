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

  // Documents state
  const [documents, setDocuments] = useState({
    idCopy: null,
    payslip: null,
    proofResidence: null,
    bankStatement: null,
  });

  // My Loans
  const [myLoans, setMyLoans] = useState([]);

  const handleTabClick = (tab) => setActiveTab(tab);

  // Fetch user's loans
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/loans/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyLoans(res.data.loans);
      } catch (err) {
        console.error('Failed to fetch loans:', err);
      }
    };
    fetchLoans();
  }, []);

  const applyLoan = async () => {
    if (!loanAmount || !loanPurpose || !repaymentPeriod || !monthlyIncome) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await API.post(
        '/loans/apply',
        { amount: loanAmount, purpose: loanPurpose, repaymentPeriod, monthlyIncome, additionalInfo: loanReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Loan application submitted successfully!');
      setLoanAmount('');
      setLoanPurpose('');
      setRepaymentPeriod('');
      setMonthlyIncome('');
      setLoanReason('');

      // Refresh My Loans
      const res = await API.get('/loans/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyLoans(res.data.loans);
    } catch (err) {
      alert('Failed to submit loan: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleFileChange = (e, type) => {
    setDocuments({ ...documents, [type]: e.target.files[0] });
  };

  const uploadDocument = async (type) => {
    if (!documents[type]) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', documents[type]);
    formData.append('type', type);

    try {
      const token = localStorage.getItem('token');
      await API.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });

      alert(`${type} uploaded successfully!`);
      setDocuments({ ...documents, [type]: null });
    } catch (err) {
      alert('Failed to upload document: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div id="user-dashboard" className="card dashboard">
      <div className="nav-bar">
        <h2>User Dashboard</h2>
        <div>
          <span className="user-info">John Doe</span>
          <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href = '#/'; }}>Logout</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{myLoans.filter(l => l.status === 'active').length}</div>
          <div>Active Loans</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">1</div>
          <div>Pending Documents</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">R{myLoans.reduce((sum, l) => sum + l.amount, 0)}</div>
          <div>Total Applied</div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'apply-loan' ? 'active' : ''}`} onClick={() => handleTabClick('apply-loan')}>Apply for Loan</button>
        <button className={`tab ${activeTab === 'my-loans' ? 'active' : ''}`} onClick={() => handleTabClick('my-loans')}>My Loans</button>
        <button className={`tab ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => handleTabClick('documents')}>Documents</button>
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
              <textarea id="loan-reason" rows="3" placeholder="Please provide additional details about your loan request" value={loanReason} onChange={(e) => setLoanReason(e.target.value)} />
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
                  <tr key={loan.id}>
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

          {['idCopy', 'payslip', 'proofResidence', 'bankStatement'].map((doc) => (
            <div key={doc} className="document-upload">
              <div className="upload-area">
                <strong>{doc.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</strong><br />
                <input type="file" id={doc} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, doc)} />
                <span onClick={() => document.getElementById(doc).click()}>Click to upload or drag and drop</span>
                <button className="btn" onClick={() => uploadDocument(doc)} style={{ marginTop: '5px' }}>Upload</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
