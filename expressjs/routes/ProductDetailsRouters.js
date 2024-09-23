const express = require('express');
const router = express.Router();
const ProductDetailsController = require('../controllers/ProductDetailsController');

      
 
// Routes for adding data
router.post('/addcategories', ProductDetailsController.addCategory);
router.post('/addbrands', ProductDetailsController.addBrand);
router.post('/addmodels', ProductDetailsController.addModel);
router.post('/addsizes', ProductDetailsController.addSize);
  

router.get('/getcategories', ProductDetailsController.getCategories);
router.get('/getbrands/:categoryId', ProductDetailsController.getBrands);
router.get('/getmodels/:brandId', ProductDetailsController.getModels);
router.get('/getsizes/:modelId', ProductDetailsController.getSizes);
  

module.exports = router;
