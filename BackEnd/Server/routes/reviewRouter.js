const express = require('express');
const productController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/:id')
  .post(authController.protectForCustomer, productController.reviewProduct);

module.exports = router;