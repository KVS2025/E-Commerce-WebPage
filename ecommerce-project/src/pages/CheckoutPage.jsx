/* eslint-disable react/prop-types */
import { formatMoney } from '../utils/money';
import './checkout-header.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart = [] }) {
    const SHIPPING = 4.99;

    // Convert total priceCents to dollars
    const subtotal = cart.reduce((total, item) => {
        return total + (item.product.priceCents / 100) * item.quantity;
    }, 0);

    const totalBeforeTax = subtotal + SHIPPING;
    const estimatedTax = totalBeforeTax * 0.1;
    const orderTotal = totalBeforeTax + estimatedTax;

    return (
        <>
            {document.title = "Checkout"}

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" alt="Logo" />
                            <img className="mobile-logo" src="images/mobile-logo.png" alt="Mobile Logo" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (
                        <a className="return-to-home-link" href="/">
                            {cart.length} {cart.length === 1 ? "item" : "items"}
                        </a>
                        )
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" alt="Lock Icon" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {cart.length > 0 ? (
                            cart.map((cartItem) => (
                                <div key={cartItem.productId} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date: {cartItem.deliveryDate || "Tuesday, June 21"}
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img
                                            className="product-image"
                                            src={cartItem.product.image}
                                            alt={cartItem.product.name}
                                        />

                                        <div className="cart-item-details">
                                            <div className="product-name">{cartItem.product.name}</div>
                                            <div className="product-price">
                                                {formatMoney(cartItem.product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">Update</span>
                                                <span className="delete-quantity-link link-primary">Delete</span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>

                                            <div className="delivery-option">
                                                <input
                                                    type="radio"
                                                    className="delivery-option-input"
                                                    name={`delivery-option-${cartItem.productId}`}
                                                    defaultChecked
                                                />
                                                <div>
                                                    <div className="delivery-option-date">Tuesday, June 21</div>
                                                    <div className="delivery-option-price">FREE Shipping</div>
                                                </div>
                                            </div>

                                            <div className="delivery-option">
                                                <input
                                                    type="radio"
                                                    className="delivery-option-input"
                                                    name={`delivery-option-${cartItem.productId}`}
                                                />
                                                <div>
                                                    <div className="delivery-option-date">Monday, June 20</div>
                                                    <div className="delivery-option-price">$4.99 - Standard</div>
                                                </div>
                                            </div>

                                            <div className="delivery-option">
                                                <input
                                                    type="radio"
                                                    className="delivery-option-input"
                                                    name={`delivery-option-${cartItem.productId}`}
                                                />
                                                <div>
                                                    <div className="delivery-option-date">Tomorrow</div>
                                                    <div className="delivery-option-price">$9.99 - Express</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">Payment Summary</div>

                        <div className="payment-summary-row">
                            <div>Items ({cart.length}):</div>
                            <div className="payment-summary-money">
                                {formatMoney(subtotal * 100)}
                            </div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">{formatMoney(SHIPPING * 100)}</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">{formatMoney(totalBeforeTax * 100)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">{formatMoney(estimatedTax * 100)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">{formatMoney(orderTotal * 100)}</div>
                        </div>

                        <button className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
