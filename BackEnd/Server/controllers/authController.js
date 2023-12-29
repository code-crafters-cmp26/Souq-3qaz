const db = require('../db');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');
const { promisify } = require('util');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const errorController = require('../controllers/errorController');

const signToken = id => {
  // @ts-ignore
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, userId, role, statusCode, res) => {
  const token = signToken(userId);

  const cookieOptions = {
    // @ts-ignore
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production')
    cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    user: user['rows'][0],
    'role': role
  });
}

exports.createUser = catchAsync(async (req, res, next) => {

  const {
    FName, LName, PhoneNumber, Email, Password, Gender, ApartmentNumber,
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

  if (!FName || !LName || !PhoneNumber || !Email || !Password || !Gender || !ApartmentNumber || !BuildingNumber || !Country || !City || !Street) {
    return next(new AppError('some required Fields are empty', 409));
  }

  if (!User.phoneCheck(PhoneNumber)) {
    return next(new AppError('Phone number must only contain numerical digits', 400));
  }

  if (!User.checkEmail(Email)) {
    return next(new AppError('Email is invalid', 400));
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
  const newUser = await db.query(`INSERT INTO "User" Values(DEFAULT, '${FName}', '${LName}', '${PhoneNumber}', '${image}',
    '${balance}', '${Email}', '${hashedPassword}', '${theme}', ${banned}, '${Gender}', ${ApartmentNumber}, ${BuildingNumber},
    '${Country}', '${City}', '${Street}','${passwordChangedAt}','${passwordresettoken}','${passwordresetexpires}') RETURNING *;`)

  const newUserId = await db.query(`SELECT id FROM "User" WHERE email = '${Email}';`);
  if (role === 'Seller') {
    await db.query(`INSERT INTO Seller Values('${newUser['rows'][0]['id']}','${NId}');`);
  }
  if (role === 'Customer') {
    await db.query(`INSERT INTO Customer Values('${newUser['rows'][0]['id']}','Normal');`);
  }

  createSendToken(newUser, newUserId['rows'][0]['id'], role, 201, res);
});


exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return next(new AppError('please provide email & password', 400));
  }

  if (!User.checkEmail(email)) {
    return next(new AppError('incorrect email or password', 401));
  }

  const employee = await db.query(`SELECT * FROM employee WHERE email = '${email}';`);
  if (employee['rowCount'] == 0) {
    const data = await db.query(`SELECT * FROM "User" WHERE email = '${email}';`);
    if (data['rowCount'] == 0) {
      return next(new AppError('incorrect email or password', 401));
    }
    const user = await db.query(`SELECT password FROM "User" WHERE email = '${email}';`);
    const newUserId = await db.query(`SELECT id FROM "User" WHERE email = '${email}';`);
    const truePassword = user['rows'][0]['password'] + '';
    // @ts-ignore
    const correct = await User.checkPassword(password, truePassword);
    if (correct == -1) return next(new AppError('some thing went wrong try again', 500));
    // @ts-ignore
    if (user['rowCount'] == 0 || !correct) {
      return next(new AppError('incorrect email or password', 401));
    }

    // @ts-ignore
    let roole = await db.query(`SELECT * FROM Seller WHERE id = ${newUserId['rows'][0]['id']};`);
    if (roole['rowCount'] != 0) {
      createSendToken(data, newUserId['rows'][0]['id'], 'Seller', 200, res);
    }
    roole = await db.query(`SELECT type FROM Customer WHERE id = ${newUserId['rows'][0]['id']};`);
    if (roole['rowCount'] != 0) {
      createSendToken(data, newUserId['rows'][0]['id'], roole['rows'][0]['type'], 200, res);
    }
  }
  // console.log(email, password);
  const user = await db.query(`SELECT * FROM employee WHERE email = '${email}';`);
  const truePassword = user['rows'][0]['password'] + '';
  // @ts-ignore
  const correct = await User.checkPassword(password, truePassword);
  if (correct == -1) return next(new AppError('some thing went wrong try again', 500));
  // @ts-ignore
  if (user['rowCount'] == 0 || !correct) {
    return next(new AppError('incorrect email or password', 401));
  }
  createSendToken(employee, user['rows'][0]['id'], user['rows'][0]['position'], 200, res);

});

// @ts-ignore
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) getting the token and check if its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('you are not logged in', 401));
  }
  // 2) verification of the token
  // @ts-ignore
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) check if the user still exist
  // @ts-ignore
  const freshUser = await db.query(`SELECT * FROM "User" WHERE id = ${decoded.id}`);
  if (!freshUser['rowCount']) {
    return next(new AppError('you are no longer exist', 401));
  }

  req.user = freshUser;
  next();
});

// @ts-ignore
exports.protectForSeller = catchAsync(async (req, res, next) => {
  let token;
  // 1) getting the token and check if its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('you are not logged in', 401));
  }
  // 2) verification of the token
  // @ts-ignore
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) check if the user still exist
  // @ts-ignore
  const freshUser = await db.query(`SELECT * FROM "User" WHERE id = ${decoded.id}`);
  if (!freshUser['rowCount']) {
    return next(new AppError('you are no longer exist', 401));
  }

  const isSeller = await db.query(`SELECT * FROM Seller WHERE id = ${freshUser['rows'][0]['id']}`);

  if (!isSeller['rowCount']) {
    return next(new AppError('Need Seller Auth', 403));
  }

  req.user = freshUser;
  next();
});

// @ts-ignore
exports.protectForCustomer = catchAsync(async (req, res, next) => {
  let token;
  // 1) getting the token and check if its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('you are not logged in', 401));
  }

  // 2) verification of the token
  // @ts-ignore
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) check if the user still exist
  // @ts-ignore
  const freshUser = await db.query(`SELECT * FROM "User" WHERE id = ${decoded.id}`);

  if (!freshUser['rowCount']) {
    return next(new AppError('you are no longer exist', 401));
  }

  const isCustomer = await db.query(`SELECT * FROM Customer WHERE id = ${freshUser['rows'][0]['id']}`);

  if (!isCustomer['rowCount']) {
    return next(new AppError('This Action Need Customer Auth', 403));
  }

  req.user = freshUser;
  next();
});

// @ts-ignore
exports.protectForPCustomer = catchAsync(async (req, res, next) => {


  let token;
  // 1) getting the token and check if its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('you are not logged in', 401));
  }

  // 2) verification of the token
  // @ts-ignore
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) check if the user still exist
  // @ts-ignore
  const freshUser = await db.query(`SELECT * FROM "User" WHERE id = ${decoded.id}`);

  if (!freshUser['rowCount']) {
    return next(new AppError('you are no longer exist', 401));
  }

  const isCustomer = await db.query(`SELECT * FROM Customer WHERE id = ${freshUser['rows'][0]['id']}`);

  if (!isCustomer['rowCount'] || isCustomer['rows'][0]['type'] != 'Premium') {
    return next(new AppError('This Action Need Premium Customer Auth', 403));
  }

  req.user = freshUser;
  next();
});

// @ts-ignore
exports.protectForAdmin = catchAsync(async (req, res, next) => {


  let token;
  // 1) getting the token and check if its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('you are not logged in', 401));
  }

  // 2) verification of the token
  // @ts-ignore
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) check if the user still exist
  // @ts-ignore
  if (decoded.id != 1) {
    return next(new AppError('This Action Need Admin Auth'))
  }

  next();
});

exports.protectForEmployee = catchAsync(async (req, res, next) => {

  let token;
  // 1) getting the token and check if its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('you are not logged in', 401));
  }

  // 2) verification of the token
  // @ts-ignore
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) check if the user still exist
  // @ts-ignore
  const freshUser = await db.query(`SELECT * FROM employee WHERE id = ${decoded.id}`);

  if (!freshUser['rowCount']) {
    return next(new AppError('This Action Need employee Auth', 403));
  }

  req.user = freshUser;
  next();
});

exports.protectFromCustomer = catchAsync(async (req, res, next) => {

  let token;
  // 1) getting the token and check if its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('you are not logged in', 401));
  }

  // 2) verification of the token
  // @ts-ignore
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) check if the user still exist
  // @ts-ignore
  let freshUser = await db.query(`SELECT * FROM customer WHERE id = ${decoded.id}`);

  if (freshUser['rowCount'] != 0) {
    return next(new AppError('You are not allowed to do this', 403));
  }
  // @ts-ignore
  freshUser = await db.query(`SELECT * FROM "User" WHERE id = ${decoded.id}`);
  if (!freshUser['rowCount']) {
    req.user = -1
  }
  else {
    req.user = decoded.id
  }
  next();
});