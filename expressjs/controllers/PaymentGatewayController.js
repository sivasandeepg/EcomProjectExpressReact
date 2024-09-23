const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


exports.createCheckoutSession = async (req, res) => {
  const { cartItems, customer } = req.body;

  // Map cart items to Stripe line items format
  const lineItems = cartItems.map(item => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  try {
    // Create or retrieve a customer in Stripe
    let stripeCustomer;
    const existingCustomers = await stripe.customers.list({
      email: customer.email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      stripeCustomer = existingCustomers.data[0];
    } else {
      stripeCustomer = await stripe.customers.create({
        email: customer.email,
        name: customer.name,
        address: {
          line1: customer.line1,
          line2: customer.line1,
          city: customer.city,
          state: customer.state,
          postal_code: customer.postal_code,
          country: customer.country,
        },
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/checkout',
      customer: stripeCustomer.id,
      billing_address_collection: 'auto', // Auto-fill billing address
      metadata: {
        customer_name: customer.name,
        customer_address: JSON.stringify({
          line1: customer.line1,
          line2: customer.line2,
          city: customer.city,
          state: customer.state,
          postal_code: customer.postal_code,
          country: customer.country,
        }),
      },
    });
    // Send session ID back to client
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
};
 
      
   
exports.paymentStatus = async (req, res) => {
  const { session_id } = req.params;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const customerList = await stripe.customers.list({
      email: session.customer_details.email,
      limit: 1,
    });
    
    const customer = customerList.data[0];

    if (session.payment_status === 'paid') {
      const transaction = {
        id: session.id,
        customerId: session.customer,
        amount: session.amount_total,
        currency: session.currency,
        status: session.payment_status,
      };

      res.status(200).json({ message: 'Payment successful', transaction, customer: { data: [customer] } });
    } else {
      res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  