// src/Customer/Components/Checkout/Payment.js
import React from 'react';
import styles from '../../../Styles/Customer/Payment.module.css'; 
const Payment = ({ onPay }) => {
  const handlePay = () => {
    onPay();
  };

  return (
    <div className={styles.container}>
      <h2>Payment</h2>
      <button onClick={handlePay} className={styles.button}>Pay Now</button>
    </div>
  );
};
 

export default Payment;
 