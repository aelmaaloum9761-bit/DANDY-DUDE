import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../common/contexts/CartContext';
import CartItem from '../common/cart/CartItem';
import CartSummary from '../common/cart/CartSummary';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, getCartTotal } = useCart();

  const cartSubtotal = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-empty">
        <div className="container text-center">
          <h1>Your Shopping Cart</h1>
          <div className="empty-cart-message">
            <i className="fas fa-shopping-bag"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart-content">
          {/* List of all cart items */}
          <div className="cart-items-list">
            {cartItems.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
          
          {/* Cart summary sidebar */}
          <aside className="cart-summary-container">
            <CartSummary subtotal={cartSubtotal} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;