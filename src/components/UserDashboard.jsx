import React, { useState } from "react";
import "./UserDashboard.css"; // Create this stylesheet for styling

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("apply-loan");
  const [loans, setLoans] = useState([]);
  const [documents, setDocuments] = useState({});

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments((prev) => ({ ...prev, [type]: file.name }));
    }
  };

  const applyLoan = () => {
    const newLoan = {
      id: loans.length + 1,
      amount: 1500,
      status: "Pending",
    };
    setLoans([...loans, newLoan]);
    alert("Loan application submitted!");
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "#/login";
  };

  return (
    <div id="user-dashboard" className="card dashboard active">
      {/* Nav Bar */}
      <div className="nav-bar">
        <h2>User Dashboard</h2>
        <div>
          <span className="user-info">
            {localStorage.getItem("userName") || "John Doe"}
          </span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{loans.length}</div>
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

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "apply-loan" ? "active" : ""}`}
          onClick={() => setActiveTab("apply-loan")}
        >
          Apply for Loan
        </button>
        <button
          className={`tab ${activeTab === "my-loans" ? "active" : ""}`}
          onClick={() => setActiveTab("my-loans")}
        >
          My Loans
        </button>
        <button
          className={`tab ${activeTab === "documents" ? "active" : ""}`}
          onClick={() => setActiveTab("documents")}
        >
          Documents
        </button>
      </div>

      {/* Apply Loan Tab */}
      {activeTab === "apply-loan" && (
        <div id="apply-loan" className="tab-content active">
          <h3>Apply for a New Loan</h3>
          <div className="loan-form">
            <div className="form-group">
              <label htmlFor="loan-amount">Loan Amount (R300 - R4,000)</label>
              <input type="number" id="loan-amount" min="300" max="4000" />
            </div>
            <div className="form-group">
              <label htmlFor="loan-purpose">Loan Purpose</label>
              <select id="loan-purpose">
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
              <select id="repayment-period">
                <option value="">Select Period</option>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="monthly-income">Monthly Income</label>
              <input type="number" id="monthly-income" />
            </div>
            <div className="form-group">
              <label htmlFor="loan-reason">Additional Information</label>
              <textarea
                id="loan-reason"
                rows="3"
                placeholder="Please provide details about your loan request"
              ></textarea>
            </div>
          </div>
          <button className="btn" onClick={applyLoan}>
            Submit Loan Application
          </button>
        </div>
      )}

      {/* My Loans Tab */}
      {activeTab === "my-loans" && (
        <div id="my-loans" className="tab-content active">
          <h3>My Loan Applications</h3>
          <div id="loans-list">
            {loans.length === 0 ? (
              <p>No loan applications found.</p>
            ) : (
              <ul>
                {loans.map((loan) => (
                  <li key={loan.id}>
                    Loan #{loan.id} - R{loan.amount} - {loan.status}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === "documents" && (
        <div id="documents" className="tab-content active">
          <h3>Upload Required Documents</h3>
          <p>Please upload all required documents:</p>

          {[
            { label: "Certified ID Copy", type: "id-copy" },
            { label: "Latest Payslip", type: "payslip" },
            { label: "Proof of Residence", type: "proof-residence" },
            { label: "3 Months Bank Statement", type: "bank-statement" },
          ].map((doc) => (
            <div className="document-upload" key={doc.type}>
              <div className="upload-area">
                <strong>{doc.label}</strong>
                <br />
                <input
                  type="file"
                  id={doc.type}
                  onChange={(e) => handleFileUpload(e, doc.type)}
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ display: "none" }}
                />
                <span onClick={() => document.getElementById(doc.type).click()}>
                  Click to upload
                </span>
                <div className="upload-status">
                  {documents[doc.type] && <em>{documents[doc.type]} uploaded</em>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
