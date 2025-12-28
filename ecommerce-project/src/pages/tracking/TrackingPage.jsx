import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { Header } from "../../components/Header";
import './TrackingPage.css';

export function TrackingPage() {
    const [searchParams] = useSearchParams();
    const [orderProduct, setOrderProduct] = useState(null);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const orderId = searchParams.get('orderId');
    const productId = searchParams.get('productId');

    useEffect(() => {
        const fetchTrackingInfo = async () => {
            try {
                setLoading(true);
                console.log('Fetching order:', orderId, 'product:', productId);
                
                // Fetch orders with expanded products
                const response = await axios.get('/api/orders?expand=products');
                const orders = response.data;
                
                // Find the specific order
                const foundOrder = orders.find(o => o.id === orderId);
                
                if (foundOrder) {
                    setOrder(foundOrder);
                    
                    // Find the specific product in the order
                    const foundProduct = foundOrder.products.find(p => p.productId === productId);
                    setOrderProduct(foundProduct);
                }
            } catch (error) {
                console.error('Error fetching tracking info:', error);
            } finally {
                setLoading(false);
            }
        };

        if (orderId && productId) {
            fetchTrackingInfo();
        }
    }, [orderId, productId]);

    // Calculate delivery status
    const getDeliveryStatus = () => {
        if (!orderProduct) return { status: 'preparing', progress: 0 };
        
        const orderTime = order.orderTimeMs;
        const deliveryTime = orderProduct.estimatedDeliveryTimeMs;
        const currentTime = Date.now();
        
        const totalDuration = deliveryTime - orderTime;
        const elapsed = currentTime - orderTime;
        const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
        
        let status = 'preparing';
        if (progressPercent > 66) {
            status = 'delivered';
        } else if (progressPercent > 33) {
            status = 'shipped';
        }
        
        return { status, progress: progressPercent };
    };

    if (loading) {
        return (
            <>
                <title>Tracking</title>
                <Header />
                <div className="tracking-page">
                    <div>Loading tracking information...</div>
                </div>
            </>
        );
    }

    if (!orderProduct || !order) {
        return (
            <>
                <title>Tracking</title>
                <Header />
                <div className="tracking-page">
                    <div>Tracking information not found.</div>
                    <a className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </a>
                </div>
            </>
        );
    }

    const { status, progress } = getDeliveryStatus();
    const product = orderProduct.product;

    return (
        <>
            <title>Tracking</title>

            <Header />

            <div className="tracking-page">
                <div className="order-tracking">
                    <a className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </a>

                    <div className="delivery-date">
                        Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={product.image} alt={product.name} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${status === 'preparing' ? 'current-status' : ''}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${status === 'shipped' ? 'current-status' : ''}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${status === 'delivered' ? 'current-status' : ''}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}