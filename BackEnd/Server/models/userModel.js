const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const is = require('is');
const catchAsync = require('../utils/catchAsync');

exports.checkPassword = function (candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword);
};

exports.checkEmail = function (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.phoneCheck = function (PhoneNumber) {
  return /^\d+$/.test(PhoneNumber)
};

exports.hashPassword = function (password) {
  return bcrypt.hash(password, 12)
};