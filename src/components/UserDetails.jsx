import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function UserDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/admin/user/' + id);
        setData(res.data);
      } catch (err) {
        alert('Failed to load user');
      }
    })();
  }, [id]);

  async function updateLoan(loanId, status) {
    try {
      await api.patch('/api/admin/loan/' + loanId, { status });
      alert('Updated');
      const res = await api.get('/api/admin/user/' + id);
      setData(res.data);
    } catch (err) { alert('Failed to update'); }
  }

  if (!data) return <div style={{padding:20}}>Loading...</div>;

  const { user, loans } = data;
  return (
    <div style={{padding:20}}>
      <h2>User: {user.email}</h2>
      <h3>Documents</h3>
      <div>
        ID: {user.documents.idCopy ? <a href={user.documents.idCopy} target="_blank" rel="noreferrer">view</a> : 'none'}
      </div>
      <div>
        Payslip: {user.documents.payslip ? <a href={user.documents.payslip} target="_blank" rel="noreferrer">view</a> : 'none'}
      </div>
      <div>
        Proof: {user.documents.proofOfResidence ? <a href={user.documents.proofOfResidence} target="_blank" rel="noreferrer">view</a> : 'none'}
      </div>
      <div>
        Bank Statements:
        {user.documents.bankStatement && user.documents.bankStatement.length > 0 ? user.documents.bankStatement.map((b,i)=>(
          <div key={i}><a href={b} target="_blank" rel="noreferrer">view #{i+1}</a></div>
        )) : ' none'}
      </div>

      <h3 style={{marginTop:16}}>Loans</h3>
      <ul>
        {loans.map(l => (
          <li key={l._id} style={{border:'1px solid #ddd', padding:8, marginBottom:8}}>
            R{l.amount} — {l.status} — {new Date(l.createdAt).toLocaleString()}
            <div style={{marginTop:8}}>
              <button onClick={()=>updateLoan(l._id,'approved')} style={{marginRight:8}}>Approve</button>
              <button onClick={()=>updateLoan(l._id,'rejected')}>Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
