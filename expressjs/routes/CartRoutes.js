const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.post('/add', CartController.addCart);
router.get('/view', CartController.viewCart);
router.post('/checkout', CartController.checkout); 
router.post('/updatequantity',CartController.updateQuantity);  
router.post('/removeitem', CartController.removeItem); 
 
module.exports = router;
 