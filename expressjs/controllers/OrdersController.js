// controllers/OrdersController.js
const Order = require('../models/Order'); // Adjust path as necessary
const nodemailer = require('nodemailer');
 
exports.confirmOrder = async (req, res) => {
  const { transaction, customer } = req.body;

  try {
    // Save order details to database
    const newOrder = new Order({
      transactionId: transaction.id,
      customerId: transaction.customer,
      amount: transaction.amount_total,
      currency: transaction.currency,
      status: transaction.payment_status,
      items: transaction.line_items, // Assuming line_items is part of the transaction object
    });
    await newOrder.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another email service
      auth: {
        user: 'sivasandeepmedia@gmail.com',
        pass: '5@ndeep.G',
      },
    });
  
    const mailOptions = {
      from: 'sivasandeepmedia@gmail.com',
      to: 'sivasandeepmedia@gmail.com', 
      subject: 'Order Confirmation',
      text: `Your order has been placed successfully! Order ID: ${newOrder._id}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).send('Order confirmed');
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).send('Internal Server Error');
  }
};
   