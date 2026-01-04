import React, { useState } from 'react';
import * as apiService from '../services/apiService'; // Your mock API service
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // In a real app, this would send the data to your backend
      await apiService.sendContactForm(formData);
      setStatus({ type: 'success', message: 'Thank you for your message! We will get back to you shortly.' });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        <p className="contact-intro">We'd love to hear from you. Send us a message and we will respond as soon as possible.</p>
        
        <div className="contact-layout">
          {/* Contact Form */}
          <section className="contact-form-section">
            <h2>Send us a message</h2>
            {status.message && (
              <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                {status.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </section>

          {/* Contact Information */}
          <section className="contact-info-section">
            <h2>Get in Touch</h2>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Address</h3>
                <p>123 Dandy Street<br />Casablanca, Morocco 20000</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+212 6XX XXX XXX</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>support@dandydudes.com</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <div>
                <h3>Business Hours</h3>
                <p>Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM<br />Sun: Closed</p>
              </div>
            </div>
          </section>
        </div>

        {/* Map Section */}
        <section className="map-section">
          <h2>Find Us</h2>
          <div className="map-container">
            <iframe 
              title="DANDY DUDES Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.499534836942!2d-7.589842484795!3d33.594369980744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d3a4b5c3c3c3c%3A0x1234567890abcdef!2sCasablanca!5e0!3m2!1sen!2sma!4v1234567890"
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy">
            </iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;