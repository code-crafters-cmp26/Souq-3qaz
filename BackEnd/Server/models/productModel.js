const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');

exports.idCheck = function (id) {
  return /^\d+$/.test(id)
};