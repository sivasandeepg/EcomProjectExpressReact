// src/Customer/Components/Checkout/CheckoutList.js
import React from 'react';
import styles from '../../../Styles/Customer/CheckoutList.module.css';

const CheckoutList = ({ cartItems }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <h2>Checkout Summary</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} className={styles.item}>
            {item.name} - {item.quantity} x ₹{item.price} {/* Changed $ to ₹ assuming INR currency */}
          </li>
        ))}
      </ul>
      <p className={styles.total}>Total: ₹{total}</p> {/* Changed $ to ₹ assuming INR currency */}
    </div>
  );
};

export default CheckoutList;
 