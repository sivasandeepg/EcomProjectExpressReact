const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');

router.post('/confirm', OrdersController.confirmOrder);

module.exports = router;  