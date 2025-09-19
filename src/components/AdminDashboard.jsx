import React, { useEffect, useState } from 'react';
import API from '../api';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Make sure to take the array from the response
        setUsers(res.data.users || []);
      } catch (err) {
        alert('Failed to fetch users: ' + err.response?.data?.message || err.message);
      }
    };
    fetchUsers();
  }, [token]);
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {Array.isArray(users) && users.map(user => (
          <li key={user._id}>
            {user.email} - {user.role}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default AdminDashboard;
