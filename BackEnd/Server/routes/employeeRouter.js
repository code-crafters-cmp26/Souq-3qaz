const express = require('express');
const employeeController = require('../controllers/employeeController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .post(authController.protectForAdmin, employeeController.addTech)

router
  .route('/stat')
  .get(authController.protectForEmployee, employeeController.getNumOfUsers)

router
  .route('/avgTrans')
  .get(authController.protectForEmployee, employeeController.getAvgTrans)

module.exports = router;