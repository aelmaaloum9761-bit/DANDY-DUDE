import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../common/products/ProductGrid';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an actual API call
        const mockProducts = [
          { id: 'wl1', name: "Premium Leather Wallet", price: 170, image: `${process.env.PUBLIC_URL}/images/wal1.jpeg`, isNew: true, category: 'wallets' },
          { id: 'wl2', name: "Elegant Leather Wallet", price: 170, image: `${process.env.PUBLIC_URL}/images/wal2.jpeg`, isNew: true, category: 'wallets' },
          { id: 'wl3', name: "Modern Wallet", price: 170, image: `${process.env.PUBLIC_URL}/images/wal3.png`, category: 'wallets' },
          { id: 'wl4', name: "Classic Bifold Wallet", price: 170, image: `${process.env.PUBLIC_URL}/images/wal4.png`, category: 'wallets' },
          { id: 'wl5', name: "Designer Wallet", price: 170, image: `${process.env.PUBLIC_URL}/images/wal5.png`, category: 'wallets' },
          { id: 'wl6', name: "Executive Wallet", price: 170, image: `${process.env.PUBLIC_URL}/images/wal6.png`, category: 'wallets' },
          { id: 'wl7', name: "Business Wallet", price: 170, image: `${process.env.PUBLIC_URL}/images/wal7.png`, category: 'wallets' },
          { id: 'wl8', name: "Premium Bifold Wallet", price: 170, image: `${process.env.PUBLIC_URL}/images/wal8.png`, category: 'wallets' },
          { id: 'wl9', name: "Signature Wallet", price: 170, image: `${process.env.PUBLIC_URL}/images/wal9.png`, category: 'wallets' },
        ];
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setFeaturedProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text-with-image">
            <div className="hero-text-column">
              <p className="hero-subtitle">Elegant Collection</p>
              <h1 className="hero-title">The Watch<br/>Everyone Wants!</h1>
            </div>
            <div className="hero-watch-feature">
              <img src={`${process.env.PUBLIC_URL}/images/women home.png`} alt="Women's Watch" className="featured-watch-img" />
            </div>
            <div className="hero-watch-feature">
              <img src={`${process.env.PUBLIC_URL}/images/home page.png`} alt="Men's Watch" className="featured-watch-img" />
            </div>
          </div>
          <p className="hero-description">Experience the perfect blend of style and precision with the watch that's capturing everyone's attention.</p>
          <Link to="/category/mens-watches" className="cta-button">Shop Now</Link>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="featured-categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            <Link to="/category/mens-watches" className="category-card">
              <img src={`${process.env.PUBLIC_URL}/images/men1.png`} alt="Men's Watches" className="category-image" />
              <h3>Men's Watches</h3>
            </Link>
            <Link to="/category/womens-watches" className="category-card">
              <img src={`${process.env.PUBLIC_URL}/images/women3.png`} alt="Women's Watches" className="category-image" />
              <h3>Women's Watches</h3>
            </Link>
            <Link to="/category/wallets" className="category-card">
              <img src={`${process.env.PUBLIC_URL}/images/wal1.jpeg`} alt="Wallets" className="category-image" />
              <h3>Wallets</h3>
            </Link>
            <div className="category-card" style={{opacity: 0.7, cursor: 'not-allowed'}}>
              <img src={`${process.env.PUBLIC_URL}/images/gmen1.jpeg`} alt="Glasses" className="category-image" />
              <h3>Glasses - Coming Soon</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="featured-products-section">
        <div className="container">
          <ProductGrid 
            title="Featured Products" 
            products={featuredProducts} 
            loading={loading} 
          />
        </div>
      </section>

      {/* 4. Brand Story */}
      <section className="brand-story">
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>At DANDY DUDES, we believe that elegance lies in the details. Since our inception, we've been dedicated to crafting sophisticated accessories that complement your style and make a statement without saying a word. Each piece in our collection is curated with a passion for timeless design and modern quality.</p>
            <Link to="/about" className="text-link">Learn More About Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;