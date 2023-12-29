const express = require("express");
const barterController = require("../controllers/barterController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protectForSeller, barterController.getBarter)
  .post(authController.protectForSeller, barterController.barterProduct);

router
  .route("/Approve")
  .post(authController.protectForSeller, barterController.approveBarter);

module.exports = router;
