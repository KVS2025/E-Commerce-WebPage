import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { cartService } from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (productId, quantity) => {
    await cartService.addToCart(productId, quantity);
    await loadCart();
  }, [loadCart]);

  const updateCartItem = useCallback(async (productId, quantity, deliveryOptionId) => {
    await cartService.updateCartItem(productId, quantity, deliveryOptionId);
    await loadCart();
  }, [loadCart]);

  const removeFromCart = useCallback(async (productId) => {
    await cartService.deleteCartItem(productId);
    await loadCart();
  }, [loadCart]);

  const getTotalQuantity = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        loadCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        getTotalQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
}
