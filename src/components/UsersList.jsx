import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/admin/users');
        setUsers(res.data.users || []);
      } catch (err) {
        alert('Failed to load users');
      }
    })();
  }, []);

  return (
    <div style={{padding:20}}>
      <h2>All Users</h2>
      <ul>
        {users.map(u => (
          <li key={u._id} style={{border:'1px solid #ddd',padding:8, marginBottom:8}}>
            {u.email} — {u.role}
            <div><Link to={`/admin/users/${u._id}`}>View details</Link></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
