import React, { useState, useEffect } from 'react';
import API from '../api';

function DocumentUpload() {
  const [files, setFiles] = useState({
    idCopy: null,
    payslip: null,
    proofOfResidence: null,
    bankStatement: null,
  });

  const [uploadedDocs, setUploadedDocs] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await API.get('/user/documents', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUploadedDocs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDocs();
  }, [token]);

  const handleChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      if (files[key]) formData.append(key, files[key]);
    });

    try {
      const res = await API.post('/user/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Documents uploaded successfully!');
      setUploadedDocs(res.data);
    } catch (err) {
      alert('Upload failed: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h3>Upload Documents</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Certified ID Copy:
          <input type="file" name="idCopy" onChange={handleChange} />
        </label>
        <br />
        <label>
          Latest Payslip:
          <input type="file" name="payslip" onChange={handleChange} />
        </label>
        <br />
        <label>
          Proof of Residence:
          <input type="file" name="proofOfResidence" onChange={handleChange} />
        </label>
        <br />
        <label>
          3 Months Bank Statement:
          <input type="file" name="bankStatement" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Upload Documents</button>
      </form>

      <h4>Uploaded Documents:</h4>
      <ul>
        {uploadedDocs.map((doc) => (
          <li key={doc._id}>
            {doc.type}: {doc.filename} - Status: {doc.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentUpload;
