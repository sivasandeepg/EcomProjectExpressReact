import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../Styles/Customer/Orders.module.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Orders</h1>
      <ul className={styles.orderList}>
        {orders.map(order => (
          <li key={order._id} className={styles.orderItem}>
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.productId}>
                  {item.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
 