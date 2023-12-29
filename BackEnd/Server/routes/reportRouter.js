const express = require('express');
const reportController = require('../controllers/reportController');
const authController = require('../controllers/authController');
const router = express.Router();


router
  .route('/')
  .post(authController.protectFrombanned, authController.protectForCustomer, reportController.addReport)
  .get(authController.protectForEmployee, reportController.getAllReport);

module.exports = router;