import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { confirmOrder } from '../utils/ConfirmOrder';

const Success = () => {
  const [message, setMessage] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [customer, setCustomer] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');

  useEffect(() => {
    const clearCart = async () => {
      try {
        await axios.post('http://localhost:5000/cart/checkout');
      } catch (error) {
        console.error('Failed to clear cart', error);
      }
    };

    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/payment/payment-status/${sessionId}`);
        const res = response.data;
        if (response.status === 200) {
          setMessage(res.message);
          setTransaction(res.transaction);
          setCustomer(res.customer.data[0]);
          await confirmOrder(res.transaction, res.customer.data[0]);
        } else {
          setMessage(res.message || 'Payment verification failed');
        }
      } catch (error) {
        setMessage('Error fetching payment status');
      }
    };

    if (sessionId) {
      fetchPaymentStatus();
      clearCart();
    }
 
    // const timer = setTimeout(() => {
    //   navigate('/orders');
    // }, 3000);
    // return () => clearTimeout(timer);
  }, [sessionId, navigate]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Session ID: {sessionId}</p>
      {customer && <p>Customer: {customer.name}</p>}
      <p>{message}</p>
      {transaction && (
        <div>
          <h2>Transaction Details</h2>
          <p>Transaction ID: {transaction.id}</p>
          <p>Amount: {transaction.amount / 100} {transaction.currency.toUpperCase()}</p>
          <p>Status: {transaction.status}</p>
        </div>
      )}
    </div>
  );
};

export default Success;
   