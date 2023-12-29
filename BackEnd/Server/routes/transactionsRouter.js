const express = require('express');
const transactionsController = require('../controllers/transactionsController');
const authController = require('../controllers/authController');
const router = express.Router();


router
  .route('/')
  .post(authController.protectForCustomer, transactionsController.buy)
  .get(authController.protectForSeller, transactionsController.getTranscationsforSeller);


module.exports = router;