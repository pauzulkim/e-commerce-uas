import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Cart state
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [cartTotal, setCartTotal] = useState(0);

  // ✅ TAMBAHKAN: Wishlist state
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    // Pastikan cartItems adalah array
    if (Array.isArray(cartItems)) {
      const total = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      setCartTotal(total);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      // Jika bukan array, reset ke array kosong
      setCartItems([]);
      setCartTotal(0);
    }
  }, [cartItems]);

  // ✅ TAMBAHKAN: Effect untuk wishlist
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Pastikan prevItems adalah array
      if (!Array.isArray(prevItems)) {
        prevItems = [];
      }
      
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      if (!Array.isArray(prevItems)) return [];
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      if (!Array.isArray(prevItems)) return [];
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCartTotal(0);
    localStorage.removeItem('cart');
  };

  // ✅ TAMBAHKAN: Wishlist functions
  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      if (!Array.isArray(prevItems)) {
        prevItems = [];
      }
      
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (!existingItem) {
        return [...prevItems, product];
      }
      return prevItems; // Jangan tambah jika sudah ada
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => {
      if (!Array.isArray(prevItems)) return [];
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const isInWishlist = (productId) => {
    if (!Array.isArray(wishlistItems)) return false;
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem('wishlist');
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        // Cart
        cartItems: Array.isArray(cartItems) ? cartItems : [],
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,

        // ✅ TAMBAHKAN: Wishlist functions
        wishlistItems: Array.isArray(wishlistItems) ? wishlistItems : [],
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,

        // Utility functions
        getCartCount: () => {
          const items = Array.isArray(cartItems) ? cartItems : [];
          return items.reduce((count, item) => count + item.quantity, 0);
        },
        isInCart: (productId) => {
          const items = Array.isArray(cartItems) ? cartItems : [];
          return items.some(item => item.id === productId);
        },
        getWishlistCount: () => {
          const items = Array.isArray(wishlistItems) ? wishlistItems : [];
          return items.length;
        }
      }}
    >
      {children}
    </CartContext.Provider>
  );
};