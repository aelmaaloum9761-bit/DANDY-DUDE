import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CartSummary.css';

/**
 * A component to display the cart summary including subtotal, shipping, tax, and total.
 *
 * @param {object} props - The component props.
 * @param {number} props.subtotal - The subtotal of all items in the cart.
 */
const CartSummary = ({ subtotal }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // In a real app, these would come from a backend or configuration
  const SHIPPING_COST = subtotal > 100 ? 0 : 15.00; // Free shipping over $100
  const TAX_RATE = 0.08; // 8% tax rate

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    // Mock promo code logic
    if (promoCode.toUpperCase() === 'DANDY10') {
      setDiscount(subtotal * 0.10); // 10% discount
    } else {
      setDiscount(0);
      setPromoError('Invalid promo code.');
    }
  };

  const calculateTotal = () => {
    const afterDiscount = subtotal - discount;
    const tax = afterDiscount * TAX_RATE;
    return afterDiscount + SHIPPING_COST + tax;
  };

  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>
      
      <div className="summary-line">
        <span>Subtotal</span>
        <span>د.م. {subtotal.toFixed(2)}</span>
      </div>

      {discount > 0 && (
        <div className="summary-line discount">
          <span>Discount ({promoCode})</span>
          <span>-د.م. {discount.toFixed(2)}</span>
        </div>
      )}

      <div className="summary-line">
        <span>Shipping</span>
        <span>
          {SHIPPING_COST === 0 ? (
            <span className="free-shipping">FREE</span>
          ) : (
            `د.م. ${SHIPPING_COST.toFixed(2)}`
          )}
        </span>
      </div>

      <div className="summary-line">
        <span>Tax</span>
        <span>د.م. {((subtotal - discount) * TAX_RATE).toFixed(2)}</span>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-line total">
        <span>Total</span>
        <span>د.م. {calculateTotal().toFixed(2)}</span>
      </div>

      <form className="promo-code-form" onSubmit={handleApplyPromo}>
        <input
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button type="submit">Apply</button>
      </form>
      {promoError && <p className="promo-error">{promoError}</p>}
      
      <Link to="/checkout" className="checkout-button">
        Continue to Checkout
      </Link>

      <Link to="/" className="continue-shopping-link">
        or Continue Shopping
      </Link>
    </div>
  );
};

CartSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
};

export default CartSummary;