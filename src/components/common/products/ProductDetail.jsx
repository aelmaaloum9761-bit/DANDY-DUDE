import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../common/LoadingSpinner';
import ProductGrid from './ProductGrid';
import * as apiService from '../../services/apiService'; // Mock API service
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams(); // Get product ID from the URL
  const { addToCart } = useCart();

  // State for the product data
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for user selections
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // State for related products
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be your API call
        const fetchedProduct = await apiService.getProductById(productId);
        setProduct(fetchedProduct);

        // Set initial default options
        const defaults = {};
        fetchedProduct.options?.forEach(opt => {
          defaults[opt.name] = opt.values[0];
        });
        setSelectedOptions(defaults);

        // Fetch related products
        const related = await apiService.getRelatedProducts(productId);
        setRelatedProducts(related);

      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedOptions,
      quantity,
    };
    addToCart(productToAdd, quantity);
    alert(`${product.name} added to your cart!`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  if (loading) return <LoadingSpinner overlay={true} />;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link to={`/category/${product.category}`} className="back-link">← Back to {product.category.replace('-', ' ')}</Link>
        
        <div className="product-detail-container">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
            <div className="image-thumbnails">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-rating">
              {renderStars(product.rating)}
              <span className="rating-count">({product.reviews.length} Reviews)</span>
            </div>
            <div className="product-price">
              {product.originalPrice && <span className="original-price">د.م. {product.originalPrice.toFixed(2)}</span>}
              <span className="current-price">د.م. {product.price.toFixed(2)}</span>
            </div>
            <p className="product-description">{product.shortDescription}</p>
            
            {/* Product Options */}
            <div className="product-options">
              {product.options?.map(option => (
                <div key={option.name} className="option-group">
                  <label>{option.name}:</label>
                  <div className="option-values">
                    {option.values.map(value => (
                      <button
                        key={value}
                        className={`option-value ${selectedOptions[option.name] === value ? 'active' : ''}`}
                        onClick={() => handleOptionChange(option.name, value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="purchase-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
            
            <button className="add-to-wishlist-btn">♡ Add to Wishlist</button>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-details-tabs">
          <div className="tab-buttons">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {activeTab === 'description' && <p>{product.fullDescription}</p>}
            {activeTab === 'specifications' && (
              <ul>
                {product.specifications.map((spec, i) => <li key={i}><strong>{spec.feature}:</strong> {spec.value}</li>)}
              </ul>
            )}
            {activeTab === 'reviews' && (
              <div className="reviews-section">
                {product.reviews.length > 0 ? product.reviews.map(review => (
                  <div key={review.id} className="review">
                    <h4>{review.author}</h4>
                    <div>{renderStars(review.rating)}</div>
                    <p>{review.comment}</p>
                  </div>
                )) : <p>No reviews yet. Be the first to review this product!</p>}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ProductGrid products={relatedProducts} title="You May Also Like" />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;