const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.login);

router
  .route("/")
  .get(authController.protectForEmployee, userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(authController.protectForEmployee, userController.banUser);

router.route("/Seller").get(userController.getAllSellers);

router.route("/Seller/:id").get(userController.getSellerById);

router.route("/Customer").get(userController.getAllCustomers);

router
  .route("/Customer/recharge")
  .post(authController.protectForCustomer, userController.rechargeBalance);

router
  .route("/updateInfo")
  .post(authController.protect, userController.updateInfo);

router
  .route("/Customer/wishList")
  .get(authController.protectForCustomer, userController.getWish);

router
  .route("/Customer/upgrade")
  .post(authController.protectForCustomer, userController.upgradeToPremium);

router.route("/Customer/:id").get(userController.getCustomerById);

module.exports = router;
