const express = require("express");
const auctionController = require("../controllers/auctionController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(auctionController.getAllAuction)
  .post(authController.protectForSeller, auctionController.addAuction);

router
  .route("/bid")
  .post(authController.protectForPCustomer, auctionController.addBid);

module.exports = router;
