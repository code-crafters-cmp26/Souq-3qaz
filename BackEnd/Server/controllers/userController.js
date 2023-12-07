const { request, param } = require('../app');
const db = require('../db');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');



exports.getAllUsers = catchAsync(async (req, res) => {
  const x = await db.query('SELECT * FROM  "User"');
  try {
    res.status(200).json({
      status: 'success',
      count: x['count'],
      users: x['rows']
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Error🎇"
    });
  }
});