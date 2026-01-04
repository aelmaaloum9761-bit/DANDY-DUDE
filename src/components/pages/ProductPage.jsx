import React from 'react';
import ProductDetail from '../common/products/ProductDetail';
import './ProductPage.css'; // Minimal styling for the page wrapper

const ProductPage = () => {
  return (
    <div className="product-page">
      <ProductDetail />
    </div>
  );
};

export default ProductPage;