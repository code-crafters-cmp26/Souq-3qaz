const express = require('express');
const auctionController = require('../controllers/messagesController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/:id')
  .get(authController.protect, auctionController.getAllmessages)
  .post(authController.protect, auctionController.sendmessage)

module.exports = router;