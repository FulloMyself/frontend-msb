import React, { useEffect, useState } from 'react';
import API from '../api';

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/admin/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(res.data);
      } catch (err) {
        alert('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>All Users & Loan Applications</h3>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export default AdminDashboard;
