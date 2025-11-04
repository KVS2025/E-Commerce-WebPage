import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Helper function to read JSON files
function readJSON(filename) {
  const filePath = join(__dirname, 'starting-code', 'backend', filename);
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

// Helper function to write JSON files
function writeJSON(filename, data) {
  const filePath = join(__dirname, 'starting-code', 'backend', filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET /api/cart-items?expand=product
app.get('/api/cart-items', (req, res) => {
  try {
    const cartItems = readJSON('cart.json');
    const products = readJSON('products.json');
    
    if (req.query.expand === 'product') {
      const expandedCart = cartItems.map(item => ({
        ...item,
        product: products.find(p => p.id === item.productId)
      }));
      return res.json(expandedCart);
    }
    
    res.json(cartItems);
  } catch (error) {
    console.error('Error loading cart:', error);
    res.status(500).json({ error: 'Failed to load cart' });
  }
});

// POST /api/cart-items - Add item to cart
app.post('/api/cart-items', (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const cartItems = readJSON('cart.json');
    
    // Check if product already exists in cart
    const existingItem = cartItems.find(item => item.productId === productId);
    
    if (existingItem) {
      // Update quantity if product already in cart
      existingItem.quantity += quantity;
    } else {
      // Add new item to cart with default delivery option
      cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1' // Default to first delivery option
      });
    }
    
    // Write back to file
    writeJSON('cart.json', cartItems);
    
    res.json({ success: true, cartItems });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// PUT /api/cart-items/:productId - Update cart item
app.put('/api/cart-items/:productId', (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;
    const cartItems = readJSON('cart.json');
    
    const item = cartItems.find(item => item.productId === productId);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    // Update the item
    Object.assign(item, updates);
    
    // Write back to file
    writeJSON('cart.json', cartItems);
    
    res.json({ success: true, item });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// DELETE /api/cart-items/:productId - Remove item from cart
app.delete('/api/cart-items/:productId', (req, res) => {
  try {
    const { productId } = req.params;
    let cartItems = readJSON('cart.json');
    
    const initialLength = cartItems.length;
    cartItems = cartItems.filter(item => item.productId !== productId);
    
    if (cartItems.length === initialLength) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    // Write back to file
    writeJSON('cart.json', cartItems);
    
    res.json({ success: true, cartItems });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

// GET /api/delivery-options?expand=estimatedDeliveryTime
app.get('/api/delivery-options', (req, res) => {
  try {
    const deliveryOptions = readJSON('deliveryOptions.json');
    
    if (req.query.expand === 'estimatedDeliveryTime') {
      const expandedOptions = deliveryOptions.map(option => ({
        ...option,
        estimatedDeliveryTimeMs: Date.now() + option.deliveryDays * 24 * 60 * 60 * 1000
      }));
      return res.json(expandedOptions);
    }
    
    res.json(deliveryOptions);
  } catch (error) {
    console.error('Error loading delivery options:', error);
    res.status(500).json({ error: 'Failed to load delivery options' });
  }
});

// GET /api/payment-summary
app.get('/api/payment-summary', (req, res) => {
  try {
    const cartItems = readJSON('cart.json');
    const products = readJSON('products.json');
    const deliveryOptions = readJSON('deliveryOptions.json');
    
    let productCostCents = 0;
    let shippingCostCents = 0;
    let totalItems = 0;
    
    cartItems.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      const deliveryOption = deliveryOptions.find(d => d.id === item.deliveryOptionId);
      
      if (product) {
        productCostCents += product.priceCents * item.quantity;
        totalItems += item.quantity;
      }
      if (deliveryOption) {
        shippingCostCents += deliveryOption.priceCents;
      }
    });
    
    const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
    const taxCents = Math.round(totalCostBeforeTaxCents * 0.1); // 10% tax
    const totalCostCents = totalCostBeforeTaxCents + taxCents;
    
    res.json({
      productCostCents,
      shippingCostCents,
      totalCostBeforeTaxCents,
      taxCents,
      totalCostCents,
      totalItems
    });
  } catch (error) {
    console.error('Error calculating payment summary:', error);
    res.status(500).json({ error: 'Failed to calculate payment summary' });
  }
});

// GET /api/products
app.get('/api/products', (req, res) => {
  try {
    const products = readJSON('products.json');
    res.json(products);
  } catch (error) {
    console.error('Error loading products:', error);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

// GET /api/orders?expand=products
app.get('/api/orders', (req, res) => {
  try {
    const orders = readJSON('orders.json');
    const products = readJSON('products.json');
    
    if (req.query.expand === 'products') {
      const expandedOrders = orders.map(order => ({
        ...order,
        products: order.products.map(orderProduct => ({
          ...orderProduct,
          product: products.find(p => p.id === orderProduct.productId)
        }))
      }));
      return res.json(expandedOrders);
    }
    
    res.json(orders);
  } catch (error) {
    console.error('Error loading orders:', error);
    res.status(500).json({ error: 'Failed to load orders' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📦 Serving data from: starting-code/backend/`);
});