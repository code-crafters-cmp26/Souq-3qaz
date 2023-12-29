const express = require('express');
const shippingController = require('../controllers/shippingController');
const authController = require('../controllers/authController');
const router = express.Router();


router
  .route('/')
  .post(authController.protectForEmployee, shippingController.addshipping)
  .get(shippingController.getshipping);

module.exports = router;