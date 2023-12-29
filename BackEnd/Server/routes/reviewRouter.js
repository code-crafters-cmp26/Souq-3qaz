const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/:id")
  .get(reviewController.getReviews)
  .post(authController.protectForCustomer, reviewController.reviewProduct)
  .delete(authController.protectForCustomer, reviewController.deleteReview);

module.exports = router;
