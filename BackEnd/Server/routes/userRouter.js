const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/signup').post(authController.createUser);
router.route('/login').post(authController.login);


router
  .route('/')
  .get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUserById)

router
  .route('/Seller')
  .get(userController.getAllSellers);

router
  .route('/Seller/:id')
  .get(userController.getSellerById)

router
  .route('/Customer')
  .get(userController.getAllCustomers);

router
  .route('/Customer/recharge')
  .post(authController.protectForCustomer, userController.rechargeBalance);

router
  .route('/Customer/:id')
  .get(userController.getCustomerById)

module.exports = router;