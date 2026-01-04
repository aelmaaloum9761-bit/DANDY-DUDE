import React, { createContext, useState, useContext } from 'react';

// Create the context
const CartContext = createContext();

// Create the provider component
export const CartProvider = ({ children }) => {
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

  const clearInquiry = () => {
    setInquiryItems([]);
  };

  const getInquiryCount = () => {
    return inquiryItems.length;
  };

  return (
    <CartContext.Provider
      value={{
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

// THIS IS THE NEW EXPORT
export const useInquiry = () => {
  return useContext(CartContext);
};