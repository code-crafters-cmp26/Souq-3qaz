const express = require('express');
const messagesController = require('../controllers/messagesController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/:id')
  .get(authController.protect, messagesController.getAllmessages)
  .post(authController.protect, messagesController.sendmessage)

module.exports = router;