const { request, param } = require('../app');
const db = require('../db');
const { format } = require('date-fns');
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

exports.upgradeToPremium = catchAsync(async (req, res, next) => {
  const customerId = req.user['rows'][0]['id'];

  const balance = await db.query(`SELECT balance FROM "User" WHERE id = ${customerId}`);
  if (balance['rows'][0]['balance'] < 200) {
    return next(new AppError('not enough money in your balance', 402));
  }

  const type = await db.query(`SELECT type FROM Customer WHERE id = ${customerId}`);

  if (type['rows'][0]['type'] != 'Normal') {
    return next(new AppError('You Already Have Done This Before', 409));
  }

  await db.query(`UPDATE "User" SET balance = balance - 200 WHERE id = ${customerId};`);
  await db.query(`UPDATE Customer SET type = 'Premium' WHERE id = ${customerId};`);


  res.status(200).json({
    status: 'success',
  });
});

exports.updateInfo = catchAsync(async (req, res, next) => {
  const userId = req.user['rows'][0]['id'];
  const {
    FName, LName, PhoneNumber, Password, Gender, ApartmentNumber,
    BuildingNumber, Country, City, Street, role, NId } = req.body;

  const image = 'default address';
  const balance = 0;
  const theme = 'Light';
  const banned = false;
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
  const passwordChangedAt = formattedDate;
  const passwordresettoken = '3165494';
  const passwordresetexpires = formattedDate;

  if (!FName || !LName || !PhoneNumber || !Password || !Gender || !ApartmentNumber || !BuildingNumber || !Country || !City || !Street) {
    return next(new AppError('some required Fields are empty', 409));
  }

  if (!User.phoneCheck(PhoneNumber)) {
    return next(new AppError('Phone number must only contain numerical digits', 400));
  }


  if (!role || (role != 'Seller' && role != 'Customer')) {
    return next(new AppError('role is invalid', 400));
  }

  if (role === 'Seller' && !('NId' in req.body)) {
    return next(new AppError('NId is required for sellers', 400));
  }

  if ('NId' in req.body && !User.phoneCheck(NId)) {
    return next(new AppError('NId must only contain numerical digits', 400));
  }
  const hashedPassword = await User.hashPassword(Password);
  if (hashedPassword == -1) return next(new AppError('some thing went wrong try again', 500));

  const updated = await db.query(`
  UPDATE "User"
  SET
  firstname = '${FName}',
  lastname = '${LName}',
  phonenumber  = '${PhoneNumber}',
  image   = '${image}',
  balance = ${balance},
  password = '${hashedPassword}',
  theme  = '${theme}',
  banned = ${banned},
  gender = '${Gender}',
  appartmentnumber = ${ApartmentNumber},
  buildingnumber = ${BuildingNumber},
  country = '${Country}',
  city = '${City}',
  street = '${Street}',
  passwordchangedat = '${passwordChangedAt}',
  passwordresettoken = '${passwordresettoken}',
  passwordresetexpires = '${passwordresetexpires}'
  WHERE id = ${userId}
  Returning *;
  `)

  if (updated['rowsCount'] == 0) {
    return next(new AppError('something went wrong', 500));
  }

  res.status(200).json({
    status: 'success',
    info: updated['rows']
  });
});