// src/Customer/Components/Checkout/CartItemList.js
import React from 'react';
import styles from '../../../Styles/Customer/CartItemList.module.css';

const CartItemList = ({ cartItems }) => {
  return (
    <div className={styles.container}>
      <h2>Cart Items</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} className={styles.item}>
            <span>{item.name}</span>
            <span>{item.quantity} x ₹{item.price}</span> {/* Changed $ to ₹ assuming INR currency */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItemList;
 