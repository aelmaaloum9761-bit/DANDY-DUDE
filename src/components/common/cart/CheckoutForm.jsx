import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import * as apiService from '../../services/apiService'; // Your API service
import './CheckoutForm.css';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const subtotal = getCartTotal();
  const SHIPPING_COST = subtotal > 100 ? 0 : 15.00;
  const TAX_RATE = 0.08;
  const total = subtotal + SHIPPING_COST + (subtotal * TAX_RATE);

  // State for form steps and data
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [formData, setFormData] = useState({
    // Step 1: Contact Information
    fullName: '',
    phoneNumber: '',
    email: '',
    postalCode: '',
    // Step 2: Shipping Address
    streetAddress: '',
    city: '',
    // Step 3: Order Notes
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Basic validation
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    }
    if (step === 2) {
      if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate to next step
  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    const orderData = {
      customerInfo: {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
      },
      shippingAddress: {
        streetAddress: formData.streetAddress,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      orderItems: cartItems,
      orderSummary: {
        subtotal,
        shippingCost: SHIPPING_COST,
        tax: subtotal * TAX_RATE,
        total,
      },
      notes: formData.notes,
      status: 'Pending Payment', // Custom status for Morocco flow
    };

    try {
      const response = await apiService.createOrder(orderData);
      setOrderId(response.id); // Assuming the API returns the new order ID
      clearCart();
      setOrderComplete(true);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('There was an issue placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render content based on the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2>Step 1: Contact Information</h2>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              {errors.fullName && <p className="error-message">{errors.fullName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              <small>We will call you at this number to finalize payment.</small>
              {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
              {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2>Step 2: Shipping Address</h2>
            <div className="form-group">
              <label htmlFor="streetAddress">Street Address</label>
              <input type="text" id="streetAddress" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
              {errors.streetAddress && <p className="error-message">{errors.streetAddress}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2>Step 3: Order Summary & Notes</h2>
            <div className="order-summary-checkout">
              {cartItems.map(item => (
                <div key={item.product.id} className="summary-item">
                  <span>{item.product.name} (x{item.quantity})</span>
                  <span>د.م. {(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="summary-line"><span>Subtotal</span><span>د.م. {subtotal.toFixed(2)}</span></div>
              <div className="summary-line"><span>Shipping</span><span>{SHIPPING_COST === 0 ? 'FREE' : `د.م. ${SHIPPING_COST.toFixed(2)}`}</span></div>
              <div className="summary-line"><span>Tax</span><span>د.م. {(subtotal * TAX_RATE).toFixed(2)}</span></div>
              <div className="summary-line total"><span>Total</span><span>د.م. {total.toFixed(2)}</span></div>
            </div>
            <div className="form-group">
              <label htmlFor="notes">Order Notes (Optional)</label>
              <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows="4"></textarea>
            </div>
            <div className="payment-info-box">
              <h3>Important Payment Information</h3>
              <p>Upon placing this order, you will not be charged online. A representative from DANDY DUDES will call you shortly at the phone number provided to confirm your order and arrange for payment.</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // If order is complete, show confirmation message
  if (orderComplete) {
    return (
      <div className="order-confirmation">
        <h2>Thank You For Your Order!</h2>
        <p>Your order has been placed successfully.</p>
        <p><strong>Order Number:</strong> {orderId}</p>
        <p>We will contact you at <strong>{formData.phoneNumber}</strong> shortly to finalize payment and confirm delivery details.</p>
        <button onClick={() => navigate('/')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  // Main form rendering
  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="step-indicators">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>
      
      {renderStep()}

      <div className="form-navigation">
        {step > 1 && <button type="button" onClick={prevStep} className="btn-secondary">Back</button>}
        {step < 3 && <button type="button" onClick={nextStep} className="btn-primary">Next</button>}
        {step === 3 && <button type="submit" disabled={isSubmitting} className="btn-primary place-order-btn">
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </button>}
      </div>
    </form>
  );
};

export default CheckoutForm;