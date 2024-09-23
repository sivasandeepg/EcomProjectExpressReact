import axios from 'axios';

const confirmOrder = async (orderDetails) => {
  try {
    await axios.post('http://localhost:5000/order/confirm', orderDetails);
  } catch (error) {
    console.error("Failed to confirm order", error);
  }
};
 