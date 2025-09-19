import React, { useState } from 'react';
import api from '../api';

export default function ApplyLoan() {
  const [amount, setAmount] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/api/loans/apply', { amount });
      alert(res.data.message || 'Submitted');
      setAmount('');
    } catch (err) {
      alert(err.response?.data?.message || 'Apply failed');
    }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:420, margin:20}}>
      <h2>Apply for Loan</h2>
      <input type="number" min="300" max="4000" required value={amount} onChange={e=>setAmount(e.target.value)} style={{width:'100%', padding:8, marginBottom:8}} />
      <button type="submit">Apply</button>
    </form>
  );
}
