import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItemList from '../Customer/Components/Checkout/CartItemList';
import CheckoutList from '../Customer/Components/Checkout/CheckoutList';
import AddAddress from '../Customer/Components/Checkout/AddAddress';
import Payment from '../Customer/Components/Checkout/Payment';
import styles from '../Styles/Customer/Checkout.module.css';
import { redirectToStripeCheckout } from '../utils/stripe';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState({
    name: '',
    email: '',
    line1: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'IN', // Default to India, change if necessary
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [addressError, setAddressError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart/view');
        const cart = response.data.cart;
        const mappedItems = cart.items.map(item => ({
          id: item.productId._id,
          name: item.productId.ProductName,
          quantity: item.quantity,
          price: item.productId.Price, // Assuming price is in the smallest currency unit
        }));
        setCartItems(mappedItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handlePayment = async () => {
    if (!address.line1 || !address.city || !address.state || !address.postal_code || !address.country || !address.name || !address.email) {
      setAddressError('Please provide complete delivery address and customer details before placing the order.');
    } else {
      setOrderPlaced(true);
      setAddressError('');
      try {
        await redirectToStripeCheckout(cartItems, address);
      } catch (err) {
        setError("Payment failed");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Checkout Page</h1>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <AddAddress address={address} setAddress={setAddress} />
          {addressError && <p className={styles.error}>{addressError}</p>}
        </div>
        <div className={styles.rightColumn}>
          <CartItemList cartItems={cartItems} />
          <CheckoutList cartItems={cartItems} />
        </div>
      </div>
      <Payment onPay={handlePayment} />
      {orderPlaced && <p>Order has been placed successfully!</p>}
    </div>
  );
};

export default Checkout;
  