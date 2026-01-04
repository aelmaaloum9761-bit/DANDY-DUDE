import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../common/contexts/CartContext';
import CheckoutForm from '../common/cart/CheckoutForm';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // If the cart is empty, redirect the user to the cart page
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // While the redirect is happening (or for a brief moment), you can render nothing or a loader
  if (cartItems.length === 0) {
    return null; // Or <LoadingSpinner />
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CheckoutPage;
