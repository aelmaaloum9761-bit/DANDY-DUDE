import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInquiry } from '../contexts/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToInquiry } = useInquiry();
  const navigate = useNavigate();

  const handleAddToInquiry = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToInquiry(product);
    navigate('/inquiry');
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image" 
          />
          {product.isNew && <span className="badge badge-new">New</span>}
          {product.discount && <span className="badge badge-discount">-{product.discount}%</span>}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price">
            {product.originalPrice && (
              <span className="original-price">د.م. {product.originalPrice.toFixed(2)}</span>
            )}
            <span className="current-price">د.م. {product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
      
      {/* 4. Update the button */}
      <button 
        className="add-to-cart-btn" 
        onClick={handleAddToInquiry}
        aria-label={`Add ${product.name} to inquiry`}
      >
        Add to Inquiry
      </button>
    </div>
  );
};

export default ProductCard;