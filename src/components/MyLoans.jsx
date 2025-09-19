import React, { useEffect, useState } from 'react';
import api from '../api';

export default function MyLoans() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/loans/my');
        setLoans(res.data.loans || []);
      } catch (err) {
        alert('Failed to load loans');
      }
    })();
  }, []);

  return (
    <div style={{padding:20}}>
      <h2>My Loan Applications</h2>
      {loans.length === 0 && <p>No loans yet</p>}
      <ul>
        {loans.map(l => (
          <li key={l._id} style={{border:'1px solid #ddd', padding:8, marginBottom:8}}>
            R{l.amount} — {l.status} — {new Date(l.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
