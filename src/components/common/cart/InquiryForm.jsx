import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInquiry } from '../contexts/CartContext';
import * as apiService from '../../services/apiService';
import './InquiryForm.css';

const InquiryForm = ({ onOrderConfirmed }) => {
  const navigate = useNavigate();
  const { inquiryItems, clearInquiry } = useInquiry();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inquiryItems.length === 0) {
        alert('Your inquiry list is empty. Please add some products first.');
        return;
    }
    setIsSubmitting(true);
    
    const orderData = {
      customerInfo: formData,
      orderItems: inquiryItems,
      status: 'New Inquiry', // Custom status for your admin panel
    };

    try {
      // This would be your API call to save the inquiry
      const response = await apiService.createInquiry(orderData);
      setOrderId(response.id);
      clearInquiry();
      if (onOrderConfirmed) {
        onOrderConfirmed();
      } else {
        setOrderComplete(true);
      }
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      alert('There was an issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="inquiry-confirmation">
        <h2>Thank You For Your Inquiry!</h2>
        <p>We have received your request and will contact you shortly at <strong>{formData.phoneNumber}</strong> to confirm your order and arrange payment.</p>
        <p><strong>Your Inquiry Reference:</strong> {orderId}</p>
        <button onClick={() => navigate('/')} className="btn-primary">Continue Shopping</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="inquiry-form">
      <h2>Your Contact Information</h2>
      <p>Please provide your details so we can get in touch with you to finalize your order.</p>
      
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-inquiry-btn">
        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  );
};

export default InquiryForm;