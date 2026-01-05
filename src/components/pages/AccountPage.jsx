import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../common/contexts/AuthContext';
import Dashboard from '../common/account/Dashboard';
// You will create these components later
// import OrderHistory from '../account/OrderHistory'; 
// import AccountDetails from '../account/AccountDetails';
import './AccountPage.css';

const AccountPage = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // 1. Protect the entire account section
  // If the user is not logged in, redirect them to the login page.
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-layout">
          {/* 2. Sidebar Navigation */}
          {/* This sidebar will be visible on all account sub-pages */}
          <aside className="account-sidebar">
            <h2>My Account</h2>
            <nav>
              <ul>
                <li><Link to="/account" className={location.pathname === '/account' ? 'active' : ''}>Dashboard</Link></li>
                <li><Link to="/account/orders" className={location.pathname === '/account/orders' ? 'active' : ''}>Orders</Link></li>
                <li><Link to="/account/addresses" className={location.pathname === '/account/addresses' ? 'active' : ''}>Addresses</Link></li>
                <li><Link to="/account/wishlist" className={location.pathname === '/account/wishlist' ? 'active' : ''}>Wishlist</Link></li>
                <li><Link to="/account/details" className={location.pathname === '/account/details' ? 'active' : ''}>Account Details</Link></li>
                <li><a href="#" onClick={handleLogout}>Logout</a></li>
              </ul>
            </nav>
          </aside>

          {/* 3. Main Content Area with Nested Routes */}
          {/* The content here will change based on the URL */}
          <main className="account-main-content">
            <Routes>
              {/* Default route for /account */}
              <Route path="/" element={<Dashboard />} />
              
              {/* Nested routes for other account pages */}
              {/* Uncomment these when you create the components */}
              {/* <Route path="orders" element={<OrderHistory />} /> */}
              {/* <Route path="details" element={<AccountDetails />} /> */}
              
              {/* Catch-all route: if the user goes to /account/something-unknown, redirect to dashboard */}
              <Route path="*" element={<Navigate to="/account" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;