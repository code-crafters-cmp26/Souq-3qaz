const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(authController.protectForSeller, productController.createProduct);

router
  .route('/searchProduct')
  .post(productController.getProductByName);

router
  .route('/:id')
  .get(productController.getProductById)
  .post(authController.protectForCustomer, productController.AddToWishList);

router
  .route('/searchBySeller/:id')
  .get(productController.getProductBySellerId)

module.exports = router;