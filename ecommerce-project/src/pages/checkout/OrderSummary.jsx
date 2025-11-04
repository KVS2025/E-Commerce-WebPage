import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  const [editingItemId, setEditingItemId] = useState(null);
  const [tempQuantity, setTempQuantity] = useState('');

  const handleUpdateClick = (productId, currentQuantity) => {
    setEditingItemId(productId);
    setTempQuantity(currentQuantity.toString());
  };

  const handleQuantityChange = (e) => {
    setTempQuantity(e.target.value);
  };

  const handleSaveQuantity = async (cartItem) => {
    const newQuantity = parseInt(tempQuantity);
    
    if (newQuantity === 0) {
      // Delete item if quantity is 0
      await deleteCartItem(cartItem.productId);
      return;
    }

    try {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: newQuantity,
        deliveryOptionId: cartItem.deliveryOptionId
      });
      await loadCart();
      setEditingItemId(null);
      setTempQuantity('');
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setTempQuantity('');
  };

  const deleteCartItem = async (productId) => {
    try {
      await axios.delete(`/api/cart-items/${productId}`);
      await loadCart();
      setEditingItemId(null);
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  // Generate quantity options (0-10 only)
  const getQuantityOptions = () => {
    const options = [];
    for (let i = 0; i <= 10; i++) {
      options.push(i);
    }
    return options;
  };

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        const selectedDeliveryOption = deliveryOptions
          .find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          });

        const isEditing = editingItemId === cartItem.productId;

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={cartItem.product.image}
                alt={cartItem.product.name} />

              <div className="cart-item-details">
                <div className="product-name">
                  {cartItem.product.name}
                </div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  
                  {isEditing ? (
                    <>
                      <select
                        className="quantity-select"
                        value={tempQuantity}
                        onChange={handleQuantityChange}
                        autoFocus
                        style={{
                          padding: '4px 8px',
                          marginLeft: '8px',
                          marginRight: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {getQuantityOptions().map(num => (
                          <option key={num} value={num}>
                            {num === 0 ? 'Delete' : num}
                          </option>
                        ))}
                      </select>
                      <span 
                        className="save-quantity-link link-primary"
                        onClick={() => handleSaveQuantity(cartItem)}
                        style={{ cursor: 'pointer' }}
                      >
                        Save
                      </span>
                      <span 
                        className="cancel-quantity-link link-primary"
                        onClick={handleCancelEdit}
                        style={{ cursor: 'pointer' }}
                      >
                        Cancel
                      </span>
                    </>
                  ) : (
                    <>
                      <span 
                        className="update-quantity-link link-primary"
                        onClick={() => handleUpdateClick(cartItem.productId, cartItem.quantity)}
                        style={{ cursor: 'pointer' }}
                      >
                        Update
                      </span>
                      <span 
                        className="delete-quantity-link link-primary"
                        onClick={() => deleteCartItem(cartItem.productId)}
                        style={{ cursor: 'pointer' }}
                      >
                        Delete
                      </span>
                    </>
                  )}
                </div>
              </div>

              <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
            </div>
          </div>
        );
      })}
    </div>
  );
}