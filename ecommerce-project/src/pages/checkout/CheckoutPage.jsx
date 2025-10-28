import axios from 'axios';
import { useState, useEffect } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './checkout-header.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both APIs
        const deliveryResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
          .catch(err => {
            console.error('Delivery options error:', err);
            return { data: [] }; // Return empty array on error
          });

        const paymentResponse = await axios.get('/api/payment-summary')
          .catch(err => {
            console.error('Payment summary error:', err);
            return { data: null }; // Return null on error
          });

        setDeliveryOptions(deliveryResponse.data || []);
        setPaymentSummary(paymentResponse.data);
        setLoading(false);

      } catch (err) {
        console.error('Error fetching checkout data:', err);
        setError('Failed to load checkout data');
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, [cart]);

  // Show loading
  if (loading) {
    return (
      <>
        <div className="checkout-header">
          <div className="header-content">
            <div className="checkout-header-left-section">
              <a href="/">
                <img className="logo" src="images/logo.png" alt="Logo" />
                <img className="mobile-logo" src="images/mobile-logo.png" alt="Mobile Logo" />
              </a>
            </div>
            <div className="checkout-header-middle-section">
              Checkout
            </div>
            <div className="checkout-header-right-section">
              <img src="images/icons/checkout-lock-icon.png" alt="Lock" />
            </div>
          </div>
        </div>
        <div className="checkout-page">
          <div className="page-title">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" alt="Logo" />
              <img className="mobile-logo" src="images/mobile-logo.png" alt="Mobile Logo" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link" href="/">{cart?.length || 0} items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" alt="Secure" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        {error && (
          <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div className="checkout-grid">
          <OrderSummary 
            cart={cart || []} 
            deliveryOptions={deliveryOptions || []} 
            loadCart={loadCart} 
          />

          <PaymentSummary 
            paymentSummary={paymentSummary} 
            loadCart={loadCart} 
          />
        </div>
      </div>
    </>
  );
}