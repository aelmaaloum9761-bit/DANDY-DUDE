import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../common/contexts/AuthContext';
import Dashboard from '../common/account/Dashboard';
// You will create these components later
// import OrderHistory from '../account/OrderHistory'; 
// import AccountDetails from '../account/AccountDetails';
import './AccountPage.css';

const AccountPage = () => {
  const { isAuthenticated } = useAuth();

  // 1. Protect the entire account section
  // If the user is not logged in, redirect them to the login page.
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

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
                <li><a href="/account" className="active">Dashboard</a></li>
                <li><a href="/account/orders">Orders</a></li>
                <li><a href="/account/addresses">Addresses</a></li>
                <li><a href="/account/wishlist">Wishlist</a></li>
                <li><a href="/account/details">Account Details</a></li>
                <li><a href="/logout">Logout</a></li>
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