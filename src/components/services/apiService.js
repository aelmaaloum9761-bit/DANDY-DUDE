// This file simulates communication with a backend server.
// In a real application, you would replace the mock functions with actual API calls using `fetch` or a library like `axios`.

// Helper to get full image path
const getImagePath = (path) => `${process.env.PUBLIC_URL}${path}`;

// --- MOCK DATA ---
const mockProducts = [
  // Men's Watches
  { id: 'mw1', name: 'Luxury Chronograph Watch', price: 299, image: getImagePath('/images/men1.jpeg'), isNew: true, category: 'mens-watches', style: 'luxury', color: 'black' },
  { id: 'mw2', name: 'Classic Men\'s Watch', price: 249, image: getImagePath('/images/men2.jpeg'), isNew: true, category: 'mens-watches', style: 'dress', color: 'silver' },
  { id: 'mw3', name: 'Sport Chronograph', price: 279, image: getImagePath('/images/men3.jpeg'), category: 'mens-watches', style: 'sport', color: 'black' },
  { id: 'mw4', name: 'Elegant Timepiece', price: 259, image: getImagePath('/images/men4.jpeg'), category: 'mens-watches', style: 'luxury', color: 'silver' },
  { id: 'mw5', name: 'Business Watch', price: 229, image: getImagePath('/images/men5.jpeg'), category: 'mens-watches', style: 'dress', color: 'black' },
  { id: 'mw6', name: 'Modern Sport Watch', price: 289, image: getImagePath('/images/men6.jpeg'), category: 'mens-watches', style: 'sport', color: 'black' },
  { id: 'mw7', name: 'Executive Timepiece', price: 319, image: getImagePath('/images/men7.jpeg'), category: 'mens-watches', style: 'luxury', color: 'silver' },
  { id: 'mw8', name: 'Premium Chronograph', price: 349, image: getImagePath('/images/men8.jpeg'), category: 'mens-watches', style: 'luxury', color: 'black' },
  { id: 'mw9', name: 'Designer Men\'s Watch', price: 269, image: getImagePath('/images/men9.jpeg'), category: 'mens-watches', style: 'dress', color: 'silver' },
  { id: 'mw10', name: 'Ultimate Sport Watch', price: 299, image: getImagePath('/images/men10.jpeg'), category: 'mens-watches', style: 'sport', color: 'black' },
  
  // Women's Watches
  { id: 'ww1', name: "Elegant Gold Watch", price: 269, image: getImagePath('/images/women1.png'), isNew: true, category: 'womens-watches', style: 'dress', color: 'gold' },
  { id: 'ww2', name: "Luxury Rose Gold Timepiece", price: 329, image: getImagePath('/images/women2.png'), isNew: true, category: 'womens-watches', style: 'luxury', color: 'gold' },
  { id: 'ww3', name: "Pink Dial Lady Watch", price: 399, image: getImagePath('/images/women3.png'), category: 'womens-watches', style: 'luxury', color: 'silver' },
  { id: 'ww4', name: "Designer Gold Watch", price: 289, image: getImagePath('/images/women4.png'), category: 'womens-watches', style: 'luxury', color: 'gold' },
  { id: 'ww5', name: "Classic Women's Watch", price: 259, image: getImagePath('/images/women5.png'), category: 'womens-watches', style: 'dress', color: 'gold' },
  { id: 'ww6', name: "Premium Timepiece", price: 279, image: getImagePath('/images/women6.png'), category: 'womens-watches', style: 'luxury', color: 'gold' },
  
  // Wallets
  { id: 'wl1', name: 'Premium Leather Wallet', price: 149, image: getImagePath('/images/wal1.png'), category: 'wallets', style: 'classic', color: 'brown' },
  { id: 'wl2', name: 'Elegant Leather Wallet', price: 129, image: getImagePath('/images/wal2.png'), category: 'wallets', style: 'classic', color: 'brown' },
  { id: 'wl3', name: 'Modern Wallet', price: 169, image: getImagePath('/images/wal3.png'), category: 'wallets', style: 'modern', color: 'black' },
  { id: 'wl4', name: 'Classic Bifold Wallet', price: 139, image: getImagePath('/images/wal4.png'), category: 'wallets', style: 'classic', color: 'brown' },
  { id: 'wl5', name: 'Designer Wallet', price: 179, image: getImagePath('/images/wal5.png'), category: 'wallets', style: 'luxury', color: 'black' },
  
  // Men's Glasses
  { id: 'gm1', name: 'Designer Sunglasses', price: 199, originalPrice: 249, discount: 20, image: getImagePath('/images/gmen1.jpeg'), category: 'mens-glasses', style: 'modern', color: 'black' },
  { id: 'gm2', name: 'Modern Aviator Glasses', price: 179, image: getImagePath('/images/gmen2.jpeg'), category: 'mens-glasses', style: 'modern', color: 'silver' },
  { id: 'gm3', name: 'Classic Frames', price: 159, image: getImagePath('/images/gmen3.jpeg'), category: 'mens-glasses', style: 'classic', color: 'gold' },
  { id: 'gm4', name: 'Sport Sunglasses', price: 189, image: getImagePath('/images/gmen4.jpeg'), category: 'mens-glasses', style: 'sport', color: 'black' },
  { id: 'gm5', name: 'Premium Eyewear', price: 219, image: getImagePath('/images/gmen5.jpeg'), category: 'mens-glasses', style: 'luxury', color: 'black' },
  
  // Women's Glasses
  { id: 'gw1', name: 'Elegant Sunglasses', price: 189, image: getImagePath('/images/w1.jpeg'), category: 'womens-glasses', style: 'modern', color: 'black' },
  { id: 'gw2', name: 'Chic Eyewear', price: 199, image: getImagePath('/images/w2.jpeg'), category: 'womens-glasses', style: 'luxury', color: 'gold' },
  { id: 'gw4', name: 'Stylish Sunglasses', price: 189, image: getImagePath('/images/w4.png'), category: 'womens-glasses', style: 'modern', color: 'black' },
  { id: 'gw5', name: 'Luxury Frames', price: 209, image: getImagePath('/images/w5.png'), category: 'womens-glasses', style: 'luxury', color: 'rose-gold' },
  { id: 'gw6', name: 'Designer Eyewear', price: 199, image: getImagePath('/images/w6.png'), category: 'womens-glasses', style: 'modern', color: 'tortoise' },
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
    const response = await fetch('http://localhost:5000/api/inquiries', {
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