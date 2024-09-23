import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/Customer/CartView.css';

const CartView = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const response = await axios.get('http://localhost:5000/cart/view');
            setCart(response.data.cart);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const updateQuantity = async (itemId, action) => {
        try {
            await axios.post('http://localhost:5000/cart/updatequantity', { itemId, action });
            fetchCart();
        } catch (err) {
            setError(err.message);
        }
    }; 
 
    const handleRemove = async (itemId) => {
        try {
            await axios.post('http://localhost:5000/cart/removeitem', { itemId });
            fetchCart();
        } catch (err) {
            console.error('Error removing item:', err);
            setError(err.message);
        }
    };
     

    const calculateTotal = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((acc, item) => acc + item.productId.Price * item.quantity, 0).toFixed(2);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>
            {cart && cart.items.length > 0 ? (
                <div className="cart-content">
                    <div className="cart-items">
                        {cart.items.map(item => (
                            <div key={item._id} className="cart-item">
                                <img
                                    src={item.productId.imagePath || 'path/to/default-image.jpg'}
                                    alt={item.productId.ProductName}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h2>{item.productId.ProductName}</h2>
                                    <p>Brand: {item.productId.Brand}</p>
                                    <p>Model: {item.productId.Model}</p>
                                    <p>Price: ${item.productId.Price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item._id, 'decrement')}>-</button>
                                        <button onClick={() => updateQuantity(item._id, 'increment')}>+</button>
                                    </div>
                                </div>
                                <div className="cart-item-actions">
                                    <button className="remove-button" onClick={() => handleRemove(item._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <p>Total: ${calculateTotal()}</p>
                        <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                </div>
            ) : (
                <div>Your cart is empty.</div>
            )}
        </div>
    );
};

export default CartView;
  