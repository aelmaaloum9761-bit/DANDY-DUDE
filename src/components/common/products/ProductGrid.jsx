import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import './ProductGrid.css';

/**
 * A component that displays a grid of ProductCard components.
 *
 * @param {object} props - The component props.
 * @param {Array} props.products - An array of product objects to display.
 * @param {string} [props.title] - An optional title to display above the grid.
 * @param {boolean} [props.loading] - If true, displays a loading spinner.
 */
const ProductGrid = ({ products = [], title, loading = false }) => {
  // 1. If data is still loading, show the spinner
  if (loading) {
    return <LoadingSpinner overlay={false} text="Loading products..." />;
  }

  // 2. If loading is finished but there are no products, show a message
  if (products.length === 0) {
    return (
      <div className="no-products-found">
        <h3>No products found</h3>
        <p>Try adjusting your filters or check back later for new arrivals.</p>
      </div>
    );
  }

  // 3. If we have products, render them in the grid
  return (
    <section className="product-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="product-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Define prop types for clarity and error prevention
ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
  title: PropTypes.string,
  loading: PropTypes.bool,
};

export default ProductGrid;