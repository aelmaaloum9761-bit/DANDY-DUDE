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
          { id: 'ww1', name: "Elegant Gold Watch", price: 220, image: `${process.env.PUBLIC_URL}/images/women1.png`, isNew: true, category: 'womens-watches' },
          { id: 'ww2', name: "Luxury Rose Gold Timepiece", price: 220, image: `${process.env.PUBLIC_URL}/images/women2.jpeg`, isNew: true, category: 'womens-watches' },
          { id: 'mw1', name: "Classic Men's Watch", price: 199, image: `${process.env.PUBLIC_URL}/images/men1.png`, isNew: true, category: 'mens-watches' },
          { id: 'mw2', name: "Sport Chronograph", price: 199, image: `${process.env.PUBLIC_URL}/images/men2.jpeg`, isNew: true, category: 'mens-watches' },
          { id: 'wl1', name: "Premium Leather Wallet", price: 170, image: `${process.env.PUBLIC_URL}/images/wal1.jpeg`, isNew: true, category: 'wallets' },
          { id: 'wl2', name: "Elegant Leather Wallet", price: 170, image: `${process.env.PUBLIC_URL}/images/wal2.jpeg`, isNew: true, category: 'wallets' },
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
            <Link to="/glasses" className="category-card" style={{opacity: 0.9}}>
              <img src={`${process.env.PUBLIC_URL}/images/gls1.jpeg`} alt="Glasses" className="category-image" />
              <h3>Glasses - Coming Soon</h3>
            </Link>
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