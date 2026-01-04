import React, { useEffect, useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/inquiries');
      if (!response.ok) throw new Error('Failed to fetch inquiries');
      const data = await response.json();
      setInquiries(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setError(null);
    } catch (err) {
      setError('Failed to load inquiries. Make sure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update status');
      await fetchInquiries();
    } catch (err) {
      alert('Failed to update status');
      console.error(err);
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete inquiry');
      await fetchInquiries();
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch (err) {
      alert('Failed to delete inquiry');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'contacted': return '#17a2b8';
      case 'completed': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container">
          <h1>Admin Panel - Customer Inquiries</h1>
          <p>Loading inquiries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="container">
          <h1>Admin Panel - Customer Inquiries</h1>
          <div className="error-message">
            <p>{error}</p>
            <p>To start the server, run: <code>cd server && npm install && npm start</code></p>
            <button onClick={fetchInquiries} className="btn-primary">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Panel - Customer Inquiries</h1>
          <button onClick={fetchInquiries} className="btn-refresh">Refresh</button>
        </div>

        {inquiries.length === 0 ? (
          <div className="no-inquiries">
            <p>No customer inquiries yet.</p>
          </div>
        ) : (
          <div className="admin-content">
            <div className="inquiries-list">
              <h2>All Inquiries ({inquiries.length})</h2>
              <div className="inquiries-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>Items</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map(inquiry => (
                      <tr key={inquiry.id} onClick={() => setSelectedInquiry(inquiry)} className={selectedInquiry?.id === inquiry.id ? 'selected' : ''}>
                        <td>{inquiry.id}</td>
                        <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                        <td>{inquiry.customerInfo.fullName}</td>
                        <td><a href={`tel:${inquiry.customerInfo.phoneNumber}`}>{inquiry.customerInfo.phoneNumber}</a></td>
                        <td>{inquiry.orderItems.length}</td>
                        <td>
                          <span className="status-badge" style={{ backgroundColor: getStatusColor(inquiry.status) }}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td>
                          <button onClick={(e) => { e.stopPropagation(); setSelectedInquiry(inquiry); }} className="btn-view">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedInquiry && (
              <div className="inquiry-details">
                <div className="details-header">
                  <h2>Inquiry Details</h2>
                  <button onClick={() => setSelectedInquiry(null)} className="btn-close">×</button>
                </div>

                <div className="details-section">
                  <h3>Customer Information</h3>
                  <div className="info-grid">
                    <div><strong>Name:</strong> {selectedInquiry.customerInfo.fullName}</div>
                    <div><strong>Phone:</strong> <a href={`tel:${selectedInquiry.customerInfo.phoneNumber}`}>{selectedInquiry.customerInfo.phoneNumber}</a></div>
                    <div><strong>Email:</strong> <a href={`mailto:${selectedInquiry.customerInfo.email}`}>{selectedInquiry.customerInfo.email}</a></div>
                    <div><strong>Address:</strong> {selectedInquiry.customerInfo.address}</div>
                    <div><strong>City:</strong> {selectedInquiry.customerInfo.city}</div>
                    <div><strong>Postal Code:</strong> {selectedInquiry.customerInfo.postalCode}</div>
                  </div>
                </div>

                <div className="details-section">
                  <h3>Ordered Items</h3>
                  <div className="items-list">
                    {selectedInquiry.orderItems.map((item, index) => (
                      <div key={index} className="item-card">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <h4>{item.name}</h4>
                          <p>د.م. {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="details-section">
                  <h3>Status Management</h3>
                  <div className="status-buttons">
                    <button onClick={() => updateInquiryStatus(selectedInquiry.id, 'pending')} className="btn-status pending">Pending</button>
                    <button onClick={() => updateInquiryStatus(selectedInquiry.id, 'contacted')} className="btn-status contacted">Contacted</button>
                    <button onClick={() => updateInquiryStatus(selectedInquiry.id, 'completed')} className="btn-status completed">Completed</button>
                    <button onClick={() => updateInquiryStatus(selectedInquiry.id, 'cancelled')} className="btn-status cancelled">Cancelled</button>
                  </div>
                </div>

                <div className="details-section">
                  <button onClick={() => deleteInquiry(selectedInquiry.id)} className="btn-delete">Delete Inquiry</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
