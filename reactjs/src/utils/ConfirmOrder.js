import axios from 'axios';

export const confirmOrder = async (orderDetails, customer) => {
  try {
    // First, confirm the order
    await axios.post('http://localhost:5000/order/confirm', { transaction: orderDetails, customer });

    
  } catch (error) {
    console.error("Failed to confirm order or send confirmation email", error);
    throw new Error("Order confirmation failed");
  }
};
 