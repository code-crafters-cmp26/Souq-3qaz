const express = require('express');
const auctionController = require('../controllers/auctionController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(auctionController.getAllAuction)
  .post(authController.protectFrombanned, authController.protectForSeller, auctionController.addAuction)

router
  .route('/bid')
  .post(authController.protectFrombanned, authController.protectForPCustomer, auctionController.addBid)

module.exports = router;