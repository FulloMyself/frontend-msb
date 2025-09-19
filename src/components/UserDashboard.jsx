import React from 'react';
import LoanApplicationForm from './LoanApplicationForm';
import DocumentUpload from './DocumentUpload';

function UserDashboard() {
  return (
    <div>
      <h2>User Dashboard</h2>
      <LoanApplicationForm />
      <DocumentUpload />
    </div>
  );
}

export default UserDashboard;
