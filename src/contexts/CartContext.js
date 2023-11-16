'use client';
// CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState('1');

  // Sepet verilerini harici veritabanından al ve güncelle
  // useEffect(() => {
  //   // Veritabanından sepet verilerini al ve setCartItems ile güncelle
  //   const fetchData = async () => {
  //     // const response = await fetch('your-api-url');
  //     // const data = await response.json();
  //     setCartItems('3');
  //   };

  //   fetchData();
  // }, []);

  // Sepet verilerini güncelleme işlevi
  const updateCart = (newItems) => {
    console.log('GELDİ BABO');
    setCartItems(newItems);
    // Harici veritabanını güncelleme işlemi
    // ...
  };

  // const contextValue = {
  //   cartItems,
  //   updateCart,
  // };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
