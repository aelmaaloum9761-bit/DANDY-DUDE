import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../contexts/CartContext';
import './CartItem.css';

/**
 * A component to display a single item in the shopping cart.
 *
 * @param {object} props - The component props.
 * @param {object} props.item - The cart item object.
 * @param {object} props.item.product - The product object.
 * @param {number} props.item.quantity - The quantity of the product in the cart.
 */
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  // Format selected options for display
  const optionsString = product.selectedOptions 
    ? Object.values(product.selectedOptions).join(', ')
    : '';

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="item-details">
        <h3 className="item-name">{product.name}</h3>
        {optionsString && <p className="item-options">{optionsString}</p>}
      </div>

      <div className="item-price">
        د.م. {product.price.toFixed(2)}
      </div>

      <div className="item-quantity">
        <div className="quantity-selector">
          <button onClick={() => updateQuantity(product.id, quantity - 1)}>-</button>
          <input 
            type="number" 
            value={quantity} 
            onChange={handleQuantityChange}
            min="1"
          />
          <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
        </div>
      </div>

      <div className="item-total">
        د.م. {(product.price * quantity).toFixed(2)}
      </div>

      <button className="item-remove" onClick={handleRemove} aria-label="Remove item">
        ×
      </button>
    </div>
  );
};

// Define prop types for clarity
CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      selectedOptions: PropTypes.object,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;