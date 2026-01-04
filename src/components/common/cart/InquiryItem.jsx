import React from 'react';
import PropTypes from 'prop-types';
import { useInquiry } from '../contexts/CartContext';
import './CartItem.css'; // Reuse cart item styles

/**
 * A component to display a single item in the inquiry list.
 * Unlike CartItem, this does not have quantity controls.
 *
 * @param {object} props - The component props.
 * @param {object} props.item - The product object in the inquiry list.
 */
const InquiryItem = ({ item }) => {
  const { removeFromInquiry } = useInquiry();

  const handleRemove = () => {
    removeFromInquiry(item.id);
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-category">{item.category}</p>
      </div>

      <div className="item-price">
        د.م. {item.price.toFixed(2)}
      </div>

      <button className="item-remove" onClick={handleRemove} aria-label="Remove item">
        ×
      </button>
    </div>
  );
};

InquiryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export default InquiryItem;
