import React, { useState } from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('apply-loan');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [repaymentPeriod, setRepaymentPeriod] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [loanReason, setLoanReason] = useState('');

  const handleTabClick = (tab) => setActiveTab(tab);

  const applyLoan = () => {
    alert(`Loan Applied:\nAmount: R${loanAmount}\nPurpose: ${loanPurpose}\nRepayment: ${repaymentPeriod} months`);
    // Reset form
    setLoanAmount('');
    setLoanPurpose('');
    setRepaymentPeriod('');
    setMonthlyIncome('');
    setLoanReason('');
  };

  return (
    <div id="user-dashboard" className="card dashboard">
      <div className="nav-bar">
        <h2>User Dashboard</h2>
        <div>
          <span className="user-info">John Doe</span>
          <button className="logout-btn" onClick={() => alert('Logged out!')}>Logout</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">0</div>
          <div>Active Loans</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">1</div>
          <div>Pending Documents</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">R1500</div>
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
              <input
                type="number"
                id="loan-amount"
                min="300"
                max="4000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
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
              <textarea
                id="loan-reason"
                rows="3"
                placeholder="Please provide additional details about your loan request"
                value={loanReason}
                onChange={(e) => setLoanReason(e.target.value)}
              />
            </div>
          </div>
          <button className="btn" onClick={applyLoan}>Submit Loan Application</button>
        </div>
      )}

      {/* My Loans Tab */}
      {activeTab === 'my-loans' && (
        <div className="tab-content">
          <h3>My Loan Applications</h3>
          <div id="loans-list">
            <p>No loan applications found.</p>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="tab-content">
          <h3>Upload Required Documents</h3>
          <p>Please upload all required documents to process your loan application:</p>
          <div className="document-upload">
            <div className="upload-area">
              <strong>Certified ID Copy</strong><br />
              <input type="file" id="id-copy" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} />
              <span onClick={() => document.getElementById('id-copy').click()}>Click to upload or drag and drop</span>
              <div id="id-copy-status"></div>
            </div>
          </div>

          <div className="document-upload">
            <div className="upload-area">
              <strong>Latest Payslip</strong><br />
              <input type="file" id="payslip" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} />
              <span onClick={() => document.getElementById('payslip').click()}>Click to upload or drag and drop</span>
              <div id="payslip-status"></div>
            </div>
          </div>

          <div className="document-upload">
            <div className="upload-area">
              <strong>Proof of Residence</strong><br />
              <input type="file" id="proof-residence" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} />
              <span onClick={() => document.getElementById('proof-residence').click()}>Click to upload or drag and drop</span>
              <div id="proof-residence-status"></div>
            </div>
          </div>

          <div className="document-upload">
            <div className="upload-area">
              <strong>3 Months Bank Statement</strong><br />
              <input type="file" id="bank-statement" accept=".pdf" style={{ display: 'none' }} />
              <span onClick={() => document.getElementById('bank-statement').click()}>Click to upload or drag and drop</span>
              <div id="bank-statement-status"></div>
            </div>
          </div>

          <div className="document-list" id="uploaded-documents">
            {/* Uploaded documents will appear here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
