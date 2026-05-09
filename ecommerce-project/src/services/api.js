import axios from 'axios';

const api = axios.create();

export const productService = {
  async getAllProducts() {
    const response = await api.get('/api/products');
    return response.data;
  },

  async getProductById(productId) {
    const response = await api.get(`/api/products/${productId}`);
    return response.data;
  }
};

export const cartService = {
  async getCart() {
    const response = await api.get('/api/cart-items?expand=product');
    return response.data;
  },

  async addToCart(productId, quantity) {
    const response = await api.post('/api/cart-items', {
      productId,
      quantity
    });
    return response.data;
  },

  async updateCartItem(productId, quantity, deliveryOptionId) {
    const response = await api.put(`/api/cart-items/${productId}`, {
      quantity,
      deliveryOptionId
    });
    return response.data;
  },

  async deleteCartItem(productId) {
    const response = await api.delete(`/api/cart-items/${productId}`);
    return response.data;
  }
};

export const orderService = {
  async getOrders() {
    const response = await api.get('/api/orders?expand=products');
    return response.data;
  },

  async createOrder() {
    const response = await api.post('/api/orders');
    return response.data;
  },

  async getDeliveryOptions() {
    const response = await api.get('/api/delivery-options?expand=estimatedDeliveryTime');
    return response.data;
  },

  async getPaymentSummary() {
    const response = await api.get('/api/payment-summary');
    return response.data;
  }
};
