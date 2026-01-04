const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'inquiries.json');

// Ensure data directory exists
const ensureDataDirectory = async () => {
  const dataDir = path.join(__dirname, 'data');
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (err) {
    console.error('Error creating data directory:', err);
  }
};

// Initialize data file if it doesn't exist
const initializeDataFile = async () => {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
};

// Read inquiries from file
const readInquiries = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading inquiries:', err);
    return [];
  }
};

// Write inquiries to file
const writeInquiries = async (inquiries) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(inquiries, null, 2));
  } catch (err) {
    console.error('Error writing inquiries:', err);
  }
};

// Email configuration (optional - configure with your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // Change this
    pass: process.env.EMAIL_PASS || 'your-app-password' // Change this
  }
});

// Send email notification
const sendEmailNotification = async (inquiryData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'your-email@gmail.com',
    to: process.env.OWNER_EMAIL || 'owner@example.com', // Your email
    subject: `New Inquiry - ${inquiryData.id}`,
    html: `
      <h2>New Customer Inquiry</h2>
      <p><strong>Inquiry ID:</strong> ${inquiryData.id}</p>
      <p><strong>Date:</strong> ${new Date(inquiryData.createdAt).toLocaleString()}</p>
      
      <h3>Customer Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${inquiryData.customerInfo.fullName}</li>
        <li><strong>Phone:</strong> ${inquiryData.customerInfo.phoneNumber}</li>
        <li><strong>Email:</strong> ${inquiryData.customerInfo.email}</li>
        <li><strong>Address:</strong> ${inquiryData.customerInfo.address}, ${inquiryData.customerInfo.city}, ${inquiryData.customerInfo.postalCode}</li>
      </ul>
      
      <h3>Ordered Items:</h3>
      <ul>
        ${inquiryData.orderItems.map(item => `
          <li>${item.name} - ${item.price} MAD</li>
        `).join('')}
      </ul>
      
      <p><strong>Total Items:</strong> ${inquiryData.orderItems.length}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent');
  } catch (err) {
    console.error('Error sending email:', err);
    // Don't fail the request if email fails
  }
};

// API Routes

// Create new inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await readInquiries();
    
    const newInquiry = {
      id: `INQ-${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    inquiries.push(newInquiry);
    await writeInquiries(inquiries);
    
    // Send email notification (optional)
    // Uncomment this line when you configure your email
    // await sendEmailNotification(newInquiry);
    
    res.status(201).json(newInquiry);
  } catch (err) {
    console.error('Error creating inquiry:', err);
    res.status(500).json({ error: 'Failed to create inquiry' });
  }
});

// Get all inquiries (for admin)
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await readInquiries();
    res.json(inquiries);
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Get single inquiry
app.get('/api/inquiries/:id', async (req, res) => {
  try {
    const inquiries = await readInquiries();
    const inquiry = inquiries.find(i => i.id === req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    
    res.json(inquiry);
  } catch (err) {
    console.error('Error fetching inquiry:', err);
    res.status(500).json({ error: 'Failed to fetch inquiry' });
  }
});

// Update inquiry status
app.patch('/api/inquiries/:id', async (req, res) => {
  try {
    const inquiries = await readInquiries();
    const index = inquiries.findIndex(i => i.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    
    inquiries[index] = { ...inquiries[index], ...req.body };
    await writeInquiries(inquiries);
    
    res.json(inquiries[index]);
  } catch (err) {
    console.error('Error updating inquiry:', err);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

// Delete inquiry
app.delete('/api/inquiries/:id', async (req, res) => {
  try {
    const inquiries = await readInquiries();
    const filteredInquiries = inquiries.filter(i => i.id !== req.params.id);
    
    if (inquiries.length === filteredInquiries.length) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    
    await writeInquiries(filteredInquiries);
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Initialize and start server
const startServer = async () => {
  await ensureDataDirectory();
  await initializeDataFile();
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
  });
};

startServer();
