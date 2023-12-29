const express = require('express');
const transactionsController = require('../controllers/transactionsController');
const authController = require('../controllers/authController');
const router = express.Router();


router
  .route('/')
  .post(authController.protectForCustomer, transactionsController.buy);

router
  .route('/:id')
  .get(authController.protectForSeller, transactionsController.getTranscations);

module.exports = router;