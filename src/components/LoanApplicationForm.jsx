import React, { useState, useEffect } from 'react';
import API from '../api';

function LoanApplicationForm() {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch user’s loan applications
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await API.get('/user/loans', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatus(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLoans();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loanAmount = parseFloat(amount);
    if (loanAmount < 300 || loanAmount > 4000) {
      alert('Loan must be between R300 and R4,000');
      return;
    }

    try {
      const res = await API.post(
        '/user/loans',
        { amount: loanAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Loan application submitted!');
      setStatus((prev) => [...prev, res.data]);
      setAmount('');
    } catch (err) {
      alert('Error submitting loan: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h3>Apply for Loan</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Loan Amount (R300–R4000)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Apply</button>
      </form>

      <h4>Your Loan Applications:</h4>
      <ul>
        {status.map((loan) => (
          <li key={loan._id}>
            Amount: R{loan.amount} - Status: {loan.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoanApplicationForm;
