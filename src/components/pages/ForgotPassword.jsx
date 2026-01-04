import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, trigger password reset email. Here we'll just show a success message if email looks valid.
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setStatus({ type: 'success', message: 'If that email is registered, password reset instructions have been sent.' });
  };

  return (
    <div className="forgot-page">
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h1>Forgot Password</h1>
        <p>Enter the email associated with your account and we'll send reset instructions.</p>
        {status && <div className={`alert ${status.type === 'error' ? 'alert-error' : 'alert-success'}`}>{status.message}</div>}
        <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: '20px auto' }}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <button className="btn btn-primary" type="submit">Send Reset Instructions</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
