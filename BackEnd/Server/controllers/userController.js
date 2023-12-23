const { request, param } = require('../app');
const db = require('../db');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');



exports.getAllUsers = catchAsync(async (req, res) => {
  const x = await db.query('SELECT * FROM  "User"');
  res.status(200).json({
    status: 'success',
    count: x['rowCount'],
    users: x['rows']
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await db.query(`SELECT * FROM  "User" WHERE id = ${id};`);
  if (result['rowCount'] == 0) {
    next(new AppError('no user found', 404));
  }
  res.status(200).json({
    status: 'success',
    count: result['count'],
    users: result['rows']
  });
});

exports.getAllSellers = catchAsync(async (req, res) => {
  const x = await db.query('SELECT * FROM  Seller');
  res.status(200).json({
    status: 'success',
    count: x['count'],
    users: x['rows']
  });
});

exports.getSellerById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await db.query(`SELECT *,s.NId FROM "User" as u,Seller as s WHERE s.id =${id} AND u.id=s.id ;`);
  if (result['rowCount'] == 0) {
    next(new AppError('no user found', 404));
  }
  res.status(200).json({
    status: 'success',
    count: result['count'],
    seller: result['rows']
  });
});

exports.getAllCustomers = catchAsync(async (req, res) => {
  const x = await db.query('SELECT * FROM  Customer');
  res.status(200).json({
    status: 'success',
    count: x['count'],
    users: x['rows']
  });
});

exports.getCustomerById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await db.query(`SELECT *,c.type FROM "User" as u,Customer as c WHERE c.id =${id} AND u.id=c.id ;`);
  const rows = result['rowCount'];
  if (rows == 0) {
    return next(new AppError('no user found', 404));
  }
  res.status(200).json({
    status: 'success',
    count: result['count'],
    customer: result['rows']
  });
});

exports.rechargeBalance = catchAsync(async (req, res, next) => {
  const customerId = req.user['rows'][0]['id'];

  const { money } = req.body;

  if (!money) {
    return next(new AppError('Money is required', 400));
  }

  if (money <= 0) {
    return next(new AppError('Money money must be positive', 400));
  }

  const result = await db.query(`UPDATE "User" SET balance = balance + ${money} WHERE id = ${customerId};`);
  const rows = result['rowCount'];
  if (rows == 0) {
    return next(new AppError('something went wrong', 500));
  }
  res.status(200).json({
    status: 'success',
  });
});