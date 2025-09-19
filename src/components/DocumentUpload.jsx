import React, { useState } from 'react';
import API from '../api';

function DocumentUpload() {
  const [files, setFiles] = useState({
    idCopy: null,
    payslip: null,
    proofOfResidence: null,
    bankStatement: null,
  });

  const handleChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.keys(files).forEach(key => {
      if (files[key]) formData.append(key, files[key]);
    });

    try {
      await API.post('/documents', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      alert('Documents uploaded!');
    } catch (err) {
      alert('Upload failed: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="idCopy" onChange={handleChange} />
      <input type="file" name="payslip" onChange={handleChange} />
      <input type="file" name="proofOfResidence" onChange={handleChange} />
      <input type="file" name="bankStatement" onChange={handleChange} />
      <button type="submit">Upload Documents</button>
    </form>
  );
}

export default DocumentUpload;
