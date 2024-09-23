import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = loadStripe('pk_test_51P06YiSJT0hyyPRN9a4h2MPxCE6c3YAM97VkYKIgO0mwA1TmcwaBG2judxVPTRDr3n3u6677oKmHtfuzBDBCim6a00Vt9tyhVp');

export const redirectToStripeCheckout = async (cartItems, customer) => {
  const stripe = await stripePublishableKey;

  try {
    const response = await axios.post('http://localhost:5000/payment/create-checkout-session', {
      cartItems,
      customer
    });

    const session = response.data;

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error('Error redirecting to Stripe:', error);
    }
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error.message);
  }
};
  