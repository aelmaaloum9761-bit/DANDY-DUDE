import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInquiry } from '../common/contexts/CartContext';
import InquiryItem from '../common/cart/InquiryItem';
import InquiryForm from '../common/cart/InquiryForm';
import './InquiryPage.css';

const InquiryPage = () => {
  const { inquiryItems } = useInquiry();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (orderConfirmed) {
    return (
      <div className="inquiry-page-empty">
        <div className="container text-center">
          <h1>Order Confirmed!</h1>
          <div className="empty-inquiry-message">
            <i className="fas fa-check-circle" style={{color: 'green', fontSize: '48px'}}></i>
            <h2>Your order is confirmed</h2>
            <p>We will call you within 24 hours to finalize your order.</p>
            <Link to="/" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  if (inquiryItems.length === 0) {
    return (
      <div className="inquiry-page-empty">
        <div className="container text-center">
          <h1>Your Inquiry List</h1>
          <div className="empty-inquiry-message">
            <i className="fas fa-clipboard-list"></i>
            <h2>Your inquiry list is empty</h2>
            <p>Browse our products and add them to your inquiry list.</p>
            <Link to="/" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inquiry-page">
      <div className="container">
        <h1>Your Inquiry List</h1>
        <div className="inquiry-content">
          <div className="inquiry-items-list">
            {inquiryItems.map(item => (
              <InquiryItem key={item.id} item={item} />
            ))}
          </div>
          
          <aside className="inquiry-form-container">
            <InquiryForm onOrderConfirmed={() => setOrderConfirmed(true)} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;