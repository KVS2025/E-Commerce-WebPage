import { useState, useCallback } from 'react';
import { cartService } from '../services/api';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await cartService.getCart();
      setCart(cartData);
      return cartData;
    } catch (err) {
      console.error('Error loading cart:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (productId, quantity) => {
    try {
      setError(null);
      await cartService.addToCart(productId, quantity);
      await loadCart();
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.message);
      throw err;
    }
  }, [loadCart]);

  const updateCartItem = useCallback(async (productId, quantity, deliveryOptionId) => {
    try {
      setError(null);
      await cartService.updateCartItem(productId, quantity, deliveryOptionId);
      await loadCart();
    } catch (err) {
      console.error('Error updating cart item:', err);
      setError(err.message);
      throw err;
    }
  }, [loadCart]);

  const removeFromCart = useCallback(async (productId) => {
    try {
      setError(null);
      await cartService.deleteCartItem(productId);
      await loadCart();
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err.message);
      throw err;
    }
  }, [loadCart]);

  const getTotalQuantity = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    loading,
    error,
    loadCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    getTotalQuantity
  };
}
