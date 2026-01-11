// This file simulates communication with a backend server.
// In a real application, you would replace the mock functions with actual API calls using `fetch` or a library like `axios`.

// Helper to get full image path
const getImagePath = (path) => `${process.env.PUBLIC_URL}${path}`;

// --- MOCK DATA ---
const mockProducts = [
  // Women's Watches
  { id: 'ww1', name: "Elegant Gold Watch", price: 220, image: getImagePath('/images/women1.png'), isNew: true, category: 'womens-watches', style: 'dress', color: 'gold' },
  { id: 'ww2', name: "Luxury Rose Gold Timepiece", price: 220, image: getImagePath('/images/women2.jpeg'), isNew: true, category: 'womens-watches', style: 'luxury', color: 'gold' },
  { id: 'ww3', name: "Pink Dial Lady Watch", price: 220, image: getImagePath('/images/women3.png'), category: 'womens-watches', style: 'luxury', color: 'silver' },
  
  // Men's Watches
  { id: 'mw1', name: "Classic Men's Watch", price: 199, image: getImagePath('/images/men1.png'), isNew: true, category: 'mens-watches', style: 'luxury', color: 'black' },
  { id: 'mw2', name: "Sport Chronograph", price: 199, image: getImagePath('/images/men2.jpeg'), isNew: true, category: 'mens-watches', style: 'sport', color: 'silver' },
  { id: 'mw3', name: "Elegant Timepiece", price: 199, image: getImagePath('/images/men3.jpeg'), category: 'mens-watches', style: 'luxury', color: 'black' },
  { id: 'mw4', name: "Business Watch", price: 199, image: getImagePath('/images/men4.png'), category: 'mens-watches', style: 'dress', color: 'silver' },
  
  // Wallets
  { id: 'wl1', name: "Premium Leather Wallet", price: 170, image: getImagePath('/images/wal1.jpeg'), isNew: true, category: 'wallets', style: 'classic', color: 'brown' },
  { id: 'wl2', name: "Elegant Leather Wallet", price: 170, image: getImagePath('/images/wal2.jpeg'), isNew: true, category: 'wallets', style: 'classic', color: 'brown' },
  { id: 'wl3', name: "Modern Wallet", price: 170, image: getImagePath('/images/wal3.png'), category: 'wallets', style: 'modern', color: 'black' },
  { id: 'wl4', name: "Classic Bifold Wallet", price: 170, image: getImagePath('/images/wal4.png'), category: 'wallets', style: 'classic', color: 'brown' },
  { id: 'wl5', name: "Designer Wallet", price: 170, image: getImagePath('/images/wal5.png'), category: 'wallets', style: 'luxury', color: 'black' },
  { id: 'wl6', name: "Executive Wallet", price: 170, image: getImagePath('/images/wal6.png'), category: 'wallets', style: 'luxury', color: 'brown' },
  { id: 'wl7', name: "Business Wallet", price: 170, image: getImagePath('/images/wal7.png'), category: 'wallets', style: 'modern', color: 'black' },
  { id: 'wl8', name: "Premium Bifold Wallet", price: 170, image: getImagePath('/images/wal8.png'), category: 'wallets', style: 'luxury', color: 'brown' },
  { id: 'wl9', name: "Signature Wallet", price: 170, image: getImagePath('/images/wal9.png'), category: 'wallets', style: 'luxury', color: 'black' },
];

// --- API FUNCTIONS ---

// Simulates a network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get all featured products for the homepage
export const getFeaturedProducts = async () => {
  await delay(800); // Simulate network request time
  return mockProducts.filter(p => p.isNew || p.discount);
};

// Get all products for a specific category
export const getProductsByCategory = async (categoryName) => {
  await delay(800);
  return mockProducts.filter(p => p.category === categoryName);
};

// Get a single product by its ID
export const getProductById = async (productId) => {
  await delay(800);
  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    throw new Error('Product not found');
  }
  // Add more detailed data for the product page
  return {
    ...product,
    images: [product.image, `${product.image}?v=2`, `${product.image}?v=3`], // Mock multiple images
    fullDescription: `This is a meticulously crafted ${product.name}. It features premium materials and unparalleled design, making it the perfect accessory for any occasion.`,
    shortDescription: `A beautiful and elegant ${product.name}.`,
    rating: 4,
    reviews: [
      { id: 1, author: 'John D.', rating: 5, comment: 'Absolutely love it!' },
      { id: 2, author: 'Jane S.', rating: 4, comment: 'Great quality, looks amazing.' },
    ],
    specifications: [
      { feature: 'Material', value: 'Premium Stainless Steel' },
      { feature: 'Water Resistance', value: '50m' },
      { feature: 'Warranty', value: '2 Years' },
    ],
    options: [
      { name: 'Size', values: ['42mm', '44mm'] },
      { name: 'Color', values: ['Black', 'Brown', 'Silver'] },
    ]
  };
};

// Get products related to a specific product
export const getRelatedProducts = async (productId) => {
  await delay(600);
  const currentProduct = mockProducts.find(p => p.id === productId);
  return mockProducts.filter(p => p.category === currentProduct.category && p.id !== productId).slice(0, 4);
};

// Search for products
export const searchProducts = async (searchTerm) => {
  await delay(600);
  const lowerCaseTerm = searchTerm.toLowerCase();
  return mockProducts.filter(p => 
    p.name.toLowerCase().includes(lowerCaseTerm) || 
    p.category.toLowerCase().includes(lowerCaseTerm)
  );
};

// --- AUTHENTICATION ---
export const login = async (email, password) => {
  await delay(1000);
  // Check in-memory / localStorage users first
  try {
    const raw = localStorage.getItem('dd_users');
    const users = raw ? JSON.parse(raw) : [];
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      return Promise.resolve({ user: { name: found.fullName || found.name || 'User', email: found.email, id: found.id } });
    }
  } catch (err) {
    // ignore localStorage errors
  }

  // Fallback test account for demos
  if (email === 'test@dandydudes.com' && password === 'password') {
    return Promise.resolve({ user: { name: 'Test User', email } });
  }

  return Promise.reject(new Error('Invalid email or password'));
};

export const register = async (fullName, email, password) => {
  await delay(1000);
  // Very small persistent registration using localStorage for demo purposes
  try {
    const raw = localStorage.getItem('dd_users');
    const users = raw ? JSON.parse(raw) : [];
    const exists = users.find(u => u.email === email);
    if (exists) {
      return Promise.reject(new Error('Email already registered'));
    }
    const newUser = { id: `u_${Date.now()}`, fullName, email, password };
    users.push(newUser);
    localStorage.setItem('dd_users', JSON.stringify(users));
    return Promise.resolve({ user: { name: fullName, email, id: newUser.id } });
  } catch (err) {
    return Promise.reject(new Error('Registration failed'));
  }
};

// --- ORDERS ---
export const createOrder = async (orderData) => {
  await delay(1500);
  console.log('Creating order:', orderData);
  // In a real app, this would save the order to your database
  // and return the newly created order with an ID
  return Promise.resolve({ id: `DD-${Date.now()}` });
};

export const getRecentOrders = async (userId) => {
  await delay(800);
  // Return empty array - no mock orders
  return [];
};

// --- INQUIRIES ---
export const createInquiry = async (inquiryData) => {
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiryData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create inquiry');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating inquiry:', error);
    // Fallback to local storage if server is not available
    await delay(1500);
    const inquiry = { id: `INQ-${Date.now()}`, ...inquiryData };
    console.log('Creating inquiry (fallback):', inquiry);
    return inquiry;
  }
};

// --- CONTACT FORM ---
export const sendContactForm = async (formData) => {
  await delay(1000);
  console.log('Sending contact form:', formData);
  // In a real app, this would send an email or save the message to a database
  return Promise.resolve();
};