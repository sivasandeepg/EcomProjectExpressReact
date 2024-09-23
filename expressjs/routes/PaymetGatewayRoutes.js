const express = require('express');
const router = express.Router();
const PaymentGatewayController = require('../controllers/PaymentGatewayController'); 
 
// create-checkout-session
router.post('/create-checkout-session', PaymentGatewayController.createCheckoutSession);
router.get('/payment-status/:session_id', PaymentGatewayController.paymentStatus);   
// router.post('/order/confirm', PaymentGatewayController.paymentStatus);
module.exports = router;
 