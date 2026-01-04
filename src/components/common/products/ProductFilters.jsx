import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductFilters.css';

/**
 * A sidebar component for filtering products.
 *
 * @param {object} props - The component props.
 * @param {object} props.filters - The current active filter values.
 * @param {Function} props.onFilterChange - Function to call when a filter changes.
 * @param {Array} props.availableFilters - Configuration for available filters.
 */
const ProductFilters = ({ filters, onFilterChange, availableFilters }) => {
  const [priceRange, setPriceRange] = useState({
    min: filters.priceRange?.min || 0,
    max: filters.priceRange?.max || 1000,
  });
  
  const [isExpanded, setIsExpanded] = useState({}); // State to toggle filter sections

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    onFilterChange('priceRange', newPriceRange);
  };

  const handleCheckboxChange = (filterKey, value) => {
    const currentValues = filters[filterKey] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value) // Remove value
      : [...currentValues, value]; // Add value
    
    onFilterChange(filterKey, newValues);
  };

  const handleClearFilters = () => {
    // This function should be defined in the parent component
    // to reset the filter state.
    // For this component, we just call the change handler with empty values.
    availableFilters.forEach(filter => {
      if (filter.type === 'range') {
        onFilterChange(filter.key, { min: 0, max: 1000 });
        setPriceRange({ min: 0, max: 1000 });
      } else {
        onFilterChange(filter.key, []);
      }
    });
  };
  
  const toggleSection = (key) => {
    setIsExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="product-filters">
      <div className="filters-header">
        <h2>Filters</h2>
        <button className="clear-filters-btn" onClick={handleClearFilters}>
          Clear All
        </button>
      </div>

      {availableFilters.map(filter => (
        <div className="filter-section" key={filter.key}>
          <button 
            className="filter-section-title"
            onClick={() => toggleSection(filter.key)}
          >
            {filter.label}
            <span className={`toggle-icon ${isExpanded[filter.key] ? 'expanded' : ''}`}>▼</span>
          </button>
          
          {isExpanded[filter.key] && (
            <div className="filter-section-content">
              {filter.type === 'checkbox' && (
                <div className="checkbox-group">
                  {filter.options.map(option => (
                    <label key={option.value} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={(filters[filter.key] || []).includes(option.value)}
                        onChange={() => handleCheckboxChange(filter.key, option.value)}
                      />
                      <span className="checkmark"></span>
                      {option.label}
                    </label>
                  ))}
                </div>
              )}

              {filter.type === 'range' && (
                <div className="range-group">
                  <div className="range-inputs">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', parseInt(e.target.value, 10))}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', parseInt(e.target.value, 10))}
                    />
                  </div>
                  {/* You could add a visual slider here for better UX */}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  availableFilters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['checkbox', 'range']).isRequired,
      options: PropTypes.array // Required for 'checkbox' type
    })
  ).isRequired,
};

export default ProductFilters;