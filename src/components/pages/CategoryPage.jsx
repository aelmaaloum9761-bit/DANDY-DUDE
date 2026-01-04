import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../common/products/ProductGrid';
import ProductFilters from '../common/products/ProductFilters';
import LoadingSpinner from '../common/common/LoadingSpinner';
import { getProductsByCategory } from '../services/apiService'; // <-- 1. Import the service function
import './CategoryPage.css';

const CategoryPage = () => {
  // Get the category name from the URL, e.g., "mens-watches"
  const { categoryName } = useParams();
  
  // State for products and loading
  const [allProducts, setAllProducts] = useState([]); // Keep original list for filtering
  const [products, setProducts] = useState([]); // The filtered list to display
  const [loading, setLoading] = useState(true);

  // State for filters, controlled by this component
  const [filters, setFilters] = useState({
    style: [],
    color: [],
    priceRange: { min: 0, max: 500 },
  });

  // Configuration for available filters for this page
  const availableFilters = [
    {
      key: 'style',
      label: 'Style',
      type: 'checkbox',
      options: [
        { value: 'dress', label: 'Dress' },
        { value: 'sport', label: 'Sport' },
        { value: 'smart', label: 'Smart' },
        { value: 'luxury', label: 'Luxury' },
      ],
    },
    {
      key: 'color',
      label: 'Color',
      type: 'checkbox',
      options: [
        { value: 'black', label: 'Black' },
        { value: 'brown', label: 'Brown' },
        { value: 'silver', label: 'Silver' },
        { value: 'gold', label: 'Gold' },
      ],
    },
    {
      key: 'priceRange',
      label: 'Price Range',
      type: 'range',
    },
  ];

  // Fetch products on component mount or when categoryName changes
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        // 2. Use the service function to fetch data
        const categoryProducts = await getProductsByCategory(categoryName);
        console.log(`Loaded ${categoryProducts.length} products for category: ${categoryName}`, categoryProducts);
        setAllProducts(categoryProducts);
        setProducts(categoryProducts); // Initially show all products
      } catch (error) {
        console.error(`Error fetching products for ${categoryName}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  // Apply filters whenever the filter state changes
  useEffect(() => {
    let filtered = allProducts;

    // Filter by style
    if (filters.style.length > 0) {
      filtered = filtered.filter(p => filters.style.includes(p.style));
    }

    // Filter by color
    if (filters.color.length > 0) {
      filtered = filtered.filter(p => filters.color.includes(p.color));
    }

    // Filter by price
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );

    setProducts(filtered);
  }, [filters, allProducts]);

  // Handler to update filter state, passed to ProductFilters
  const handleFilterChange = (filterKey, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };
  
  // Format the category name for the title (e.g., "mens-watches" -> "Mens Watches")
  const formattedTitle = categoryName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="category-page">
      <div className="container">
        <h1 className="page-title">{formattedTitle}</h1>
        <div className="category-layout">
          {/* Sidebar with filters */}
          <ProductFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            availableFilters={availableFilters}
          />
          
          {/* Main content area with product grid */}
          <main className="category-main-content">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ProductGrid 
                products={products} 
                loading={loading}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;