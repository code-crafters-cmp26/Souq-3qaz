const express = require('express');
const warehouseController = require('../controllers/warehouseController');
const authController = require('../controllers/authController');
const router = express.Router();


router
  .route('/')
  .post(authController.protectForEmployee, warehouseController.addwarehouse)
  .get(warehouseController.getwares);

module.exports = router;