import React, { useState } from 'react';
import API from '../api';

function LoanApplicationForm() {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await API.post('/loans', { amount }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Loan application submitted!');
    } catch (err) {
      alert('Failed to submit loan: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Loan Amount (R300 - R4000)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Apply for Loan</button>
    </form>
  );
}

export default LoanApplicationForm;
