import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// Local storage keys
const CART_STORAGE_KEY = "photo_shop_cart_items";

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedItems = localStorage.getItem(CART_STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });
  
  const [cartTotal, setCartTotal] = useState(0);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  // Calculate cart total whenever items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.prices[item.size] * item.quantity);
    }, 0);
    setCartTotal(total);
  }, [cartItems]);

  // Add to cart with quantity support
  const addToCart = (product, size, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if this product+size combination already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === size
      );

      if (existingItemIndex !== -1) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item with quantity
        return [
          ...prevItems,
          {
            ...product,
            size,
            quantity
          }
        ];
      }
    });
  };

  // Update quantity of a specific item
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return; // Prevent invalid quantities
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.id === productId && item.size === size)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (productId, size) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === productId && item.size === size))
    );
  };

  // Get product quantity in cart
  const getProductQuantity = (productId, size) => {
    const item = cartItems.find(
      item => item.id === productId && item.size === size
    );
    return item ? item.quantity : 0;
  };

  // Get total items count (sum of all quantities)
  const getTotalItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Handle checkout process
  const processCheckout = () => {
    // Here you would typically handle payment processing
    // For now, we'll just clear the cart
    setIsCheckoutComplete(true);
    
    // Clear cart after checkout
    setTimeout(() => {
      setCartItems([]);
      setIsCheckoutComplete(false);
    }, 2000);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        getProductQuantity,
        getTotalItemsCount,
        processCheckout,
        isCheckoutComplete
      }}
    >
      {children}
    </CartContext.Provider>
  );
};