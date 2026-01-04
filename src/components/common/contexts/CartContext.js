import React, { createContext, useState, useContext } from 'react';

// Central cart/inquiry context used across the app
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Shopping cart state (quantity-aware)
  const [cartItems, setCartItems] = useState([]); // [{ product, quantity }]

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const getCartCount = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

  // Inquiry list (no quantities, unique items)
  const [inquiryItems, setInquiryItems] = useState([]);

  const addToInquiry = (product) => {
    setInquiryItems(prevItems => {
      const itemExists = prevItems.some(item => item.id === product.id);
      if (itemExists) {
        alert('This item is already in your inquiry list.');
        return prevItems;
      }
      return [...prevItems, { ...product }];
    });
  };

  const removeFromInquiry = (productId) => {
    setInquiryItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearInquiry = () => setInquiryItems([]);

  const getInquiryCount = () => inquiryItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartTotal,
        inquiryItems,
        addToInquiry,
        removeFromInquiry,
        clearInquiry,
        getInquiryCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useInquiry = () => useContext(CartContext);