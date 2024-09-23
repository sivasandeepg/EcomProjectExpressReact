const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const upload = require('../middleware/upload'); // Import the upload middleware
 
 
// Route for adding a product
// router.post('/addproduct', upload.single('file'), ProductController.createProduct);
// router.post('/addproduct', upload.array('file', 5), ProductController.createProduct); 
  

// Route for retrieving products
router.post('/addproduct', upload.array('file', 5), ProductController.createProduct); 
router.get('/getproducts', ProductController.getProduct);   
router.get('/getsingleproducts/:id', ProductController.getSingleProduct);
   
router.put('/updateproducts/:id', upload.array('file', 5), ProductController.updateProduct); 


router.delete('/deleteproducts/:id', ProductController.deleteProduct);

module.exports = router;
 