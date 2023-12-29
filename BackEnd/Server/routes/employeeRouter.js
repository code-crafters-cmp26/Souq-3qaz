const express = require("express");
const employeeController = require("../controllers/employeeController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .post(authController.protectForAdmin, employeeController.addTech);

module.exports = router;
