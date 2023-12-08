const db = require('../db');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');
const { promisify } = require('util');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

const signToken = id => {
  // console.log(id);
  // @ts-ignore
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, userId, statusCode, res) => {
  // console.log(user['rows'][0][]);
  console.log(userId);
  const token = signToken(userId);
  // console.log(Date.now().toString().slice(0, 10));

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
    data: {
      user
    }
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
    return next(new AppError('some required Fields are empty', 400));
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
  const hashedPassword = await bcrypt.hash(Password, 12);
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

  createSendToken(newUser, newUserId['rows'][0]['id'], 201, res);
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

  const user = await db.query(`SELECT password FROM "User" WHERE email = '${email}';`);
  const newUserId = await db.query(`SELECT id FROM "User" WHERE email = '${email}';`);
  const truePassword = user['rows'][0]['password'] + '';
  // @ts-ignore
  const correct = await bcrypt.compare(password, truePassword);
  console.log(correct);
  // @ts-ignore
  if (user['rowCount'] == 0 || !correct) {
    return next(new AppError('incorrect email or password', 401));
  }

  createSendToken(user, newUserId['rows'][0]['id'], 200, res);
});


// @ts-ignore
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  console.log(req.headers);
  // 1) getting the token and check if its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('you are not logged in', 401));
  }
  // 2) verification of the token
  // @ts-ignore
  console.log(token);
  // @ts-ignore
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  // 3) check if the user still exist
  // @ts-ignore
  const freshUser = await db.query(`SELECT * FROM "User" WHERE id = ${decoded.id}`);
  console.log(freshUser);
  if (!freshUser['rowCount']) {
    return next(new AppError('you are no longer exist', 401));
  }

  req.user = freshUser;
  next();
});