import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// We get our API_URL from the .env file
const API_URL = import.meta.env.VITE_API_URL;

const CartContext = createContext();

// This is a custom hook to make it easier to use our cart context
export const useCart = () => {
  return useContext(CartContext);
};



// This is the provider component that will wrap our app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // This function fetches the current cart from the backend
  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/cart`);
      // The API returns { items, total }, we just want the items
      setCartItems(data.items || []); 
    } catch (error) {
      console.error('Failed to fetch cart', error);
      toast.error('Could not fetch cart');
    } finally {
      setLoading(false);
    }
  };

  // We fetch the cart as soon as the app loads
  useEffect(() => {
    fetchCart();
  }, []);

  // Function to add an item
  const addToCart = async (product, quantity) => {
    try {
      // The API handles the logic of new item vs. update quantity
      await axios.post(`${API_URL}/cart`, {
        productId: product._id,
        quantity: quantity,
      });
      toast.success(`${product.name} added to cart!`);
      // After adding, we re-fetch the cart to get the latest state
      await fetchCart();
    } catch (error) {
      console.error('Failed to add to cart', error);
      toast.error('Failed to add item to cart');
    }
  };

  // Function to remove an item
  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`${API_URL}/cart/${cartItemId}`);
      toast.success('Item removed from cart');
      // Re-fetch the cart to update the UI
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove from cart', error);
      toast.error('Failed to remove item');
    }
  };

  //  Function to update quantity
  const updateCartQuantity = async (cartItemId, newQuantity) => {
    // If the new quantity is 0 or less, just remove the item
    // This simplifies the logic in the component
    if (newQuantity < 1) {
      await removeFromCart(cartItemId);
      return;
    }
  
    try {
      // Call our new PUT endpoint
      await axios.put(`${API_URL}/cart/${cartItemId}`, { quantity: newQuantity });
      toast.success('Cart updated');
      // Re-fetch the cart to get the latest state
      await fetchCart();
    } catch (error) {
      console.error('Failed to update quantity', error);
      toast.error('Failed to update cart');
    }
  };

  // Function to check out
  const checkout = async (userInfo) => {
    // We calculate the total on the frontend just for this step
    const total = cartTotal; 
    
    try {
      const { data: receipt } = await axios.post(`${API_URL}/checkout`, {
        userInfo,
        total,
      });
      
      toast.success('Checkout successful! Thank you!');
      // The backend clears the cart, so we re-fetch our now-empty cart
      await fetchCart();
      return receipt; // Return the receipt to show in the modal
    } catch (error)
    {
      console.error('Checkout failed', error);
      toast.error('Checkout failed. Please try again.');
      throw error; // Re-throw error so the form can handle it
    }
  };

  // We use useMemo to calculate the total only when cartItems changes
  // This is more efficient than calculating it on every render
  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      // Make sure product and price exist before calculating
      if (item.product && typeof item.product.price === 'number') {
        return sum + (item.product.price * item.quantity);
      }
      return sum;
    }, 0);
  }, [cartItems]);

  // This is the value our context will provide to all child components
  const value = {
    cartItems,
    cartTotal,
    cartCount: cartItems.length,
    loading,
    fetchCart,
    addToCart,
    removeFromCart,
    updateCartQuantity, 
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};