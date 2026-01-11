import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- Providers (for global state) ---
import { AuthProvider } from './common/contexts/AuthContext';
import { CartProvider } from './common/contexts/CartContext';

// --- Layout Components ---
import Header from './common/common/Header';
import Footer from './common/common/Footer';

// --- Page Components ---
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import InquiryPage from './pages/InquiryPage';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';
import ComingSoonPage from './pages/ComingSoonPage';
import LoginPage from './common/account/Login';
import RegisterPage from './common/account/Register';
import AccountPage from './pages/AccountPage';

// --- Global Styles ---
import './styles/globals.css';

// A simple component for a 404 Not Found page
const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <a href="/" style={{ color: 'var(--primary-color)' }}>Go back to Homepage</a>
  </div>
);


function App() {
  return (
    // 1. Wrap the entire app in providers to make state available everywhere
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* 2. Main App Layout */}
          <div className="app">
            <Header />
            <main className="main-content">
              {/* 3. Define all the application routes */}
              <Routes>
                {/* --- Public Routes --- */}
                <Route path="/" element={<Home />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/glasses" element={<ComingSoonPage />} />
                
                {/* --- Inquiry Route (replaces Cart/Checkout) --- */}
                <Route path="/inquiry" element={<InquiryPage />} />
                
                {/* --- Admin Route --- */}
                <Route path="/admin" element={<AdminPage />} />
                
                <Route path="/contact" element={<ContactPage />} />

                {/* --- Authentication Routes --- */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* --- Protected Account Routes --- */}
                <Route path="/account/*" element={<AccountPage />} />

                {/* --- Fallback Route for 404s --- */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;