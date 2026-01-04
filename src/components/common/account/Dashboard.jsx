import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import * as apiService from '../../services/apiService';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        // In a real app, you'd pass the user ID or token
        const orders = await apiService.getRecentOrders(user.id);
        setRecentOrders(orders);
      } catch (err) {
        setError('Failed to load recent orders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, [user]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!user) {
    // This case should ideally be handled by a protected route, but it's good to have a fallback
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-welcome">
        <h1>Welcome, {user.name}!</h1>
        <p>From your dashboard, you can view your recent orders, manage your shipping addresses, and edit your password and account details.</p>
      </div>

      <div className="dashboard-content-main">
        {/* Recent Orders Section */}
        <section className="dashboard-summary">
          <h2>Recent Orders</h2>
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : recentOrders.length > 0 ? (
              <div className="recent-orders-list">
                {recentOrders.map(order => (
                  <div key={order.id} className="order-summary-card">
                    <div className="order-info">
                      <h3>Order #{order.id}</h3>
                      <p>Placed on {formatDate(order.orderDate)}</p>
                      <p>Total: <strong>د.م. {order.total.toFixed(2)}</strong></p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
                <Link to="/account/orders" className="view-all-link">View All Orders →</Link>
              </div>
            ) : (
              <div className="no-orders">
                <p>You haven't placed any orders yet.</p>
                <Link to="/" className="btn-primary">Start Shopping</Link>
              </div>
            )}
          </section>

          <section className="dashboard-quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/account/addresses" className="action-card">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Manage Addresses</h3>
                <p>Edit or add shipping addresses</p>
              </Link>
              <Link to="/account/wishlist" className="action-card">
                <i className="fas fa-heart"></i>
                <h3>View Wishlist</h3>
                <p>See your saved favorite items</p>
              </Link>
              <Link to="/account/details" className="action-card">
                <i className="fas fa-user-cog"></i>
                <h3>Edit Account</h3>
                <p>Change your name, email, and password</p>
              </Link>
              <Link to="/contact" className="action-card">
                <i className="fas fa-headset"></i>
                <h3>Get Support</h3>
                <p>Contact our customer service</p>
              </Link>
            </div>
          </section>
        </div>
    </div>
  );
};

export default Dashboard;